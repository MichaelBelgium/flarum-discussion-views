<?php

namespace Michaelbelgium\Discussionviews\Listeners;

use Carbon\Carbon;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Discussion\Discussion;
use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Arr;
use Jaybizzle\CrawlerDetect\CrawlerDetect;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;

class AddDiscussionViewHandler
{
    private LoggerInterface $logger;
    private ExtensionManager $extensionManager;
    private Dispatcher $events;
    private SettingsRepositoryInterface $settings;
    private ConnectionInterface $database;

    public function __construct(
        SettingsRepositoryInterface $settings,
        Dispatcher $events,
        ExtensionManager $extensionManager,
        LoggerInterface $logger,
        ConnectionInterface $database
    ) {
        $this->settings = $settings;
        $this->events = $events;
        $this->extensionManager = $extensionManager;
        $this->logger = $logger;
        $this->database = $database;
    }

    public function __invoke(ShowDiscussionController $controller, Discussion $discussion, ServerRequestInterface $request, $document)
    {
        if($this->settings->get('michaelbelgium-discussionviews.ignore_crawlers', false))
        {
            $crDetect = new CrawlerDetect($request->getHeader('User-Agent'));

            if ($crDetect->isCrawler()) {
                return;
            }
        }

        //The extension fof/merge-discussions does an api call to get info of a discussion when merging discussions, but it shouldn't count as a view
        //So if the extension is enabled and if the query parameter bySlug is set - which only is set when going to a discussion page manually and not through the api
        if ($this->extensionManager->isEnabled('fof-merge-discussions'))
        {
            $bySlug = Arr::get($request->getQueryParams(), 'bySlug', false);

            if (!$bySlug) {
                // $this->logger->info(__CLASS__ . ': Not counting view to discussion '. $discussion->id .' because it wasn\'t a manual visit to the discussion page');
                return;
            }
        }

        $clientIp = Arr::get($request->getServerParams(), 'HTTP_CLIENT_IP') ??
            Arr::get($request->getServerParams(), 'HTTP_X_FORWARDED_FOR') ??
            Arr::get($request->getServerParams(), 'REMOTE_ADDR');
        $trackUnique = $this->settings->get('michaelbelgium-discussionviews.track_unique', false);

        if($trackUnique)
        {
            if($clientIp === null)
            {
                // $this->logger->warning(__CLASS__ . ': Unable to get client IP => not counting this view for discussion '. $discussion->id .'.');
                return;
            }

            if ($discussion->views()->where('ip', $clientIp)->exists()) {
                return;
            }
        }

        $actor = $request->getAttribute('actor');

        if ($actor->isGuest() && !$this->settings->get('michaelbelgium-discussionviews.track_guests', true)) {
            return;
        }

        $recorded = $this->database->transaction(function () use ($actor, $clientIp, $discussion, $trackUnique) {
            $this->database->table('discussions')
                ->where('id', $discussion->id)
                ->lockForUpdate()
                ->first();

            if ($trackUnique) {
                $inserted = $this->database->table('discussion_view_uniques')->insertOrIgnore([
                    'discussion_id' => $discussion->id,
                    'ip' => $clientIp,
                ]);

                // A row already present means this IP was seen before and may have been archived.
                if ($inserted === 0) {
                    return false;
                }
            }

            $view = new DiscussionView();

            if (!$actor->isGuest()) {
                $view->user()->associate($actor);
            }

            $view->discussion()->associate($discussion);
            $view->ip = $clientIp;
            $view->visited_at = Carbon::now();

            $discussion->views()->save($view);
            $discussion->increment('view_count');

            return true;
        });

        if (!$recorded) {
            return;
        }

        $this->events->dispatch(new DiscussionWasViewed($actor, $discussion));
    }
}
