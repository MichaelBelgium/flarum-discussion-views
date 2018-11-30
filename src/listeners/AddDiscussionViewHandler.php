<?php

namespace michaelbelgium\views\listeners;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Discussion\Discussion;
use Flarum\Api\Event\WillSerializeData;
use Illuminate\Contracts\Events\Dispatcher;
use michaelbelgium\views\events\DiscussionWasViewed;

class AddDiscussionViewHandler
{
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
            $current_discussion->view_count++;

            event(new DiscussionWasViewed($event->actor, $current_discussion));
            $current_discussion->save();
        }
    }
}