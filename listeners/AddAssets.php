<?php

use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddAssets
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addClientAssets']);
    }

    /**
     * @param ConfigureWebApp $event
     */
    public function addClientAssets(ConfigureWebApp $event)
    {
        if($event->isForum())
        {
            $event->addAssets([
                __DIR__.'/../js/forum/dist/extension.js'
            ]);
            $event->addBootstrapper('michaelbelgium/flarum-discussion-views/main');
        }
    }
}