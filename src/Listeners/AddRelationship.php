<?php

namespace Michaelbelgium\Discussionviews\Listeners;

use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Event\Serializing;
use Flarum\Event\GetApiRelationship;
use Illuminate\Contracts\Events\Dispatcher;
use Michaelbelgium\Discussionviews\Serializers\DiscussionViewSerializer;

class AddRelationship
{
    const RELATIONSHIP = 'views'; //$discussion->views()
    const RELATIONSHIP_LATEST = 'latestViews';

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetApiRelationship::class, [$this, 'addApiRelationship']);
        $events->listen(WillGetData::class, [$this, 'includeRelationship']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function addApiRelationship(GetApiRelationship $event)
    {
        if($event->isRelationship(DiscussionSerializer::class, self::RELATIONSHIP_LATEST)) {
			return $event->serializer->hasMany($event->model, DiscussionViewSerializer::class, self::RELATIONSHIP_LATEST);
        }
    }

    public function includeRelationship(WillGetData $event)
    {
        if($event->controller->serializer == DiscussionSerializer::class) {
            $event->addInclude([self::RELATIONSHIP_LATEST, self::RELATIONSHIP_LATEST.'.user']);
        }
    }

    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class))
        {
            $event->attributes['canReset'] = (bool)$event->actor->can('discussion.resetViews');
            $event->attributes['canViewNumber'] = (bool)$event->actor->can('discussion.readViewnumber');
            $event->attributes['viewCount'] = $event->model->view_count;
        }
    }
}