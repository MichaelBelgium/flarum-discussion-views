<?php

use michaelbelgium\views\listeners;
use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(Listeners\AddDiscussionViewHandler::class);
    $events->subscribe(Listeners\AddAssets::class);
    $events->subscribe(Listeners\AddDiscussionApiAttributes::class);
    $events->subscribe(Listeners\AddPopularSort::class);
    $events->subscribe(Listeners\SaveDiscussionFromModal::class);
};
