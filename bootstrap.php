<?php

use michaelbelgium\views\listeners;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\DiscussionWasViewed::class);
    $events->subscribe(Listeners\AddAssets::class);
    $events->subscribe(Listeners\AddDiscussionApiAttributes::class);
};