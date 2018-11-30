<?php

namespace michaelbelgium\views\listeners;

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Event\Serializing;
use Illuminate\Contracts\Events\Dispatcher;

class AddDiscussionApiAttributes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'addApiAttributes']);
    }

    /**
     * @param Serializing $event
     */
    public function addApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class))
        {
            $event->attributes['views'] = $event->model->view_count;
            $event->attributes['canReset'] = (bool)$event->actor->can('resetViews');
        }
    }
}
