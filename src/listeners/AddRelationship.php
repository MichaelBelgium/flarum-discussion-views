<?php

namespace michaelbelgium\views\listeners;

use Flarum\Discussion\Discussion;
use Flarum\Event\GetModelRelationship;
use Illuminate\Contracts\Events\Dispatcher;
use michaelbelgium\views\models\DiscussionView;

class AddRelationship
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, "addRelationship"]);
    }

    public function addRelationship(GetModelRelationship $event)
    {
        if($event->isRelationship(Discussion::class, 'views')) {
            return $event->model->hasMany(DiscussionView::class);
        }
    }
}