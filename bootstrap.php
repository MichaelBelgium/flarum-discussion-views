<?php

require_once "listeners/DiscussionWasViewed.php";
require_once "listeners/AddAssets.php";
require_once "listeners/AddDiscussionApiAttributes.php";

use Illuminate\Contracts\Events\Dispatcher;

return function (Dispatcher $events) {
    $events->subscribe(DiscussionWasViewed::class);
    $events->subscribe(AddAssets::class);
    $events->subscribe(AddDiscussionApiAttributes::class);
};