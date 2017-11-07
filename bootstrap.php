<?php

require_once "listeners/DiscussionWasViewed.php";

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(DiscussionWasViewed::class);
};