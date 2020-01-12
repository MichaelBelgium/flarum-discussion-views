<?php

use michaelbelgium\views\listeners;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;

return [
    (new Frontend('forum'))
        ->css(__DIR__ . '/less/extension.less')
        ->js(__DIR__. '/js/dist/forum.js'),

    (new Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    function (Dispatcher $events) {
        $events->subscribe(listeners\AddRelationship::class);
        $events->subscribe(listeners\AddDiscussionViewHandler::class);
        $events->subscribe(listeners\AddDiscussionApiAttributes::class);
        // $events->subscribe(listeners\AddPopularSort::class);
        $events->subscribe(listeners\SaveDiscussionFromModal::class);
    }
]; 
