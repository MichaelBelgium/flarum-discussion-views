<?php
namespace michaelbelgium\views\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\WillGetData;

class AddPopularSort
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(WillGetData::class, [$this, 'confApi']);
    }

    /**
     * @param WillGetData $event
     */
    public function confApi(WillGetData $event)
    {
        $event->addSortField('view_count');
    }
}