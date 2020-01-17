<?php
namespace Michaelbelgium\Discussionviews\Listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Api\Event\WillGetData;
use Flarum\Settings\SettingsRepositoryInterface;

class AddPopularSort
{
    private $settings;

    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        if($this->settings->get('michaelbelgium-discussionviews.show_filter', true)) {
            $events->listen(WillGetData::class, [$this, 'confApi']);
        }
    }

    /**
     * @param WillGetData $event
     */
    public function confApi(WillGetData $event)
    {
        $event->addSortField('view_count');
    }
}