<?php

namespace Michaelbelgium\Discussionviews\Listeners;

use Carbon\Carbon;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Discussion\Discussion;
use Flarum\Api\Event\WillSerializeData;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;
use Michaelbelgium\Discussionviews\Events\DiscussionWasViewed;
use Michaelbelgium\Discussionviews\Models\DiscussionView;

class AddDiscussionViewHandler
{
    private $settings;

    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(WillSerializeData::class, [$this, "addView"]);
    }

    /**
     * @param WillSerializeData $event
     */
    public function addView(WillSerializeData $event)
    {
        if ($event->isController(ShowDiscussionController::class))
        {
            /** @var Discussion $current_discussion */
            $current_discussion = $event->data;

            if($this->settings->get('michaelbelgium-discussionviews.track_unique', false)) {
                $existingViews = $current_discussion->views()->where('ip', $_SERVER['REMOTE_ADDR'])->get();
                if($existingViews->count() > 0) {
                    return;
                }
            }
            
            $view = new DiscussionView();
            
            if(!$event->actor->isGuest()) {
                $view->user()->associate($event->actor);
            }

            $view->discussion()->associate($current_discussion);
            $view->ip = $_SERVER['REMOTE_ADDR'];
            $view->visited_at = Carbon::now();

            $current_discussion->views()->save($view);

            //for the (un)popular filter
            $current_discussion->view_count = $current_discussion->views()->count();
            $current_discussion->save();

            event(new DiscussionWasViewed($event->actor, $current_discussion));
        }
    }
}