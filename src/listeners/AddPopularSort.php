<?php
/**
 * Created by PhpStorm.
 * User: Michael
 * Date: 15/11/2017
 * Time: 21:37
 */

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

    public function confApi(ConfigureApiController $event)
    {
        $event->addSortField('views');
    }
}