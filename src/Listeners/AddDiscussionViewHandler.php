<?php

namespace Michaelbelgium\Discussionviews\Listeners;

use Carbon\Carbon;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Discussion\Discussion;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;
use Jaybizzle\CrawlerDetect\CrawlerDetect;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Psr\Http\Message\ServerRequestInterface;

class AddDiscussionViewHandler
{
    private $settings;
    private $events;

    public function __construct(SettingsRepositoryInterface $settings, Dispatcher $events) {
        $this->settings = $settings;
        $this->events = $events;
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

        $clientIp = Arr::get($request->getServerParams(), 'HTTP_CLIENT_IP') ??
            Arr::get($request->getServerParams(), 'HTTP_X_FORWARDED_FOR') ??
            Arr::get($request->getServerParams(), 'REMOTE_ADDR');

        if($this->settings->get('michaelbelgium-discussionviews.track_unique', false))
        {
            if($clientIp === null)
            {
                resolve('log')->warn('Michaelbelgium\Discussionviews\Listeners\AddDiscussionViewHandler: Unable to get client IP => not counting this view.');
                return;
            }

            $existingViews = $discussion->views()->where('ip', $clientIp)->get();
            if($existingViews->count() > 0) {
                return;
            }
        }
        
        $view = new DiscussionView();
        
        if(!$request->getAttribute('actor')->isGuest()) {
            $view->user()->associate($request->getAttribute('actor'));
        } elseif(!$this->settings->get('michaelbelgium-discussionviews.track_guests', true)) {
            return;
        }

        $view->discussion()->associate($discussion);
        $view->ip = $clientIp;
        $view->visited_at = Carbon::now();

        $discussion->views()->save($view);

        //for the (un)popular filter
        $discussion->increment('view_count');
        $discussion->save();

        $this->events->dispatch(new DiscussionWasViewed($request->getAttribute('actor'), $discussion));
    }
}