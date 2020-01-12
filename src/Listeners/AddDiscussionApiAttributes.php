<?php

namespace Michaelbelgium\Discussionviews\Listeners;

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
            $event->attributes['canReset'] = (bool)$event->actor->can('resetViews');
        }
    }
}
