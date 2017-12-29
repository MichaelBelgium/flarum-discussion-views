<?php

namespace michaelbelgium\views\listeners;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddDiscussionApiAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PrepareApiAttributes::class, [$this, 'addApiAttributes']);
    }

    /**
     * @param PrepareApiAttributes $event
     */
    public function addApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class))
        {
            $event->attributes['views'] = $event->model->views;
            $event->attributes['canReset'] = (bool)$event->actor->can('resetViews');
        }
    }
}
