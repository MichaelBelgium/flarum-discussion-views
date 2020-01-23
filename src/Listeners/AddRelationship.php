<?php

namespace Michaelbelgium\Discussionviews\Listeners;

use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Event\Serializing;
use Flarum\Discussion\Discussion;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Illuminate\Contracts\Events\Dispatcher;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Michaelbelgium\Discussionviews\Serializers\DiscussionViewSerializer;

class AddRelationship
{
    const RELATIONSHIP = 'views'; //$discussion->views()

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, "addRelationship"]);
        $events->listen(GetApiRelationship::class, [$this, 'addApiRelationship']);
        $events->listen(WillGetData::class, [$this, 'includeRelationship']);
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function addRelationship(GetModelRelationship $event)
    {
        if($event->isRelationship(Discussion::class, self::RELATIONSHIP)) {
            return $event->model->hasMany(DiscussionView::class);
        }
    }

    public function addApiRelationship(GetApiRelationship $event)
    {
        if($event->isRelationship(DiscussionSerializer::class, self::RELATIONSHIP)) {
			return $event->serializer->hasMany($event->model, DiscussionViewSerializer::class, self::RELATIONSHIP);
        }
    }

    public function includeRelationship(WillGetData $event)
    {
        if($event->controller->serializer == DiscussionSerializer::class) {
            $event->addOptionalInclude(self::RELATIONSHIP.'.discussion');
            $event->addInclude([self::RELATIONSHIP, self::RELATIONSHIP.'.user']); 
        }
    }

    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(DiscussionSerializer::class))
        {
            $event->attributes['canReset'] = (bool)$event->actor->can('resetViews');
        }
    }
}