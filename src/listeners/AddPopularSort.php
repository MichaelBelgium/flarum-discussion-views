<?php
namespace michaelbelgium\views\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\ConfigureApiController;

class AddPopularSort
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiController::class, [$this, 'confApi']);
    }

    /**
     * @param ConfigureApiController $event
     */
    public function confApi(ConfigureApiController $event)
    {
        $event->addSortField('views');
    }
}