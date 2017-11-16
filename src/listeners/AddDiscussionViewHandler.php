<?php

namespace michaelbelgium\views\listeners;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Core\Discussion;
use Flarum\Event\PrepareApiData;
use Illuminate\Contracts\Events\Dispatcher;
use michaelbelgium\views\events\DiscussionWasViewed;

class AddDiscussionViewHandler
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiData::class, [$this, "addView"]);
    }

    /**
     * @param PrepareApiData $event
     */
    public function addView(PrepareApiData $event)
    {
        if ($event->isController(ShowDiscussionController::class))
        {
            /** @var Discussion $current_discussion */
            $current_discussion = $event->data;
            $current_discussion->views++;

            event(new DiscussionWasViewed($event->actor, $current_discussion));
            $current_discussion->save();
        }
    }
}