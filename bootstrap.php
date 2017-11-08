<?php

require_once "listeners/DiscussionWasViewed.php";
require_once "listeners/AddAssets.php";

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(DiscussionWasViewed::class);
    $events->subscribe(AddAssets::class);
};