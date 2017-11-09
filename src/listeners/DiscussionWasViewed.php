<?php

namespace michaelbelgium\views\listeners;

use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Event\PrepareApiData;
use Illuminate\Contracts\Events\Dispatcher;

class DiscussionWasViewed
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
            /** @var \Flarum\Core\Discussion $current_discussion */
            $current_discussion = $event->data;

            $current_discussion->views++;
            $current_discussion->save();
        }
    }
}