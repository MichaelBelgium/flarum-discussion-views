<?php

namespace michaelbelgium\views\listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureWebApp;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;

class AddAssets
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'configAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'configLocales']);
    }

    /**
     * @param ConfigureWebApp $event
     */
    public function configAssets(ConfigureWebApp $event)
    {
        if($event->isForum())
        {
            $event->addAssets([
                __DIR__.'/../../js/forum/dist/extension.js',
                __DIR__.'/../../less/extension.less'
            ]);
            $event->addBootstrapper('michaelbelgium/flarum-discussion-views/main');
        }

        if($event->isAdmin())
        {
            $event->addAssets([
                __DIR__.'/../../js/admin/dist/extension.js'
            ]);
            $event->addBootstrapper('michaelbelgium/flarum-discussion-views/main');
        }
    }

    /**
     * @param ConfigureLocales $event
     */
    public function configLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'], false)) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }
}
