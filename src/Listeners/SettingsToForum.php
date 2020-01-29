<?php
namespace Michaelbelgium\Discussionviews\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Settings\SettingsRepositoryInterface;

class SettingsToForum
{
    private $settings;

    public function __construct(SettingsRepositoryInterface $settings) {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'addSettings']);
    }

    public function addSettings(Serializing $event)
    {
        if($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['mb-discussionviews.show_filter'] = $this->settings->get('michaelbelgium-discussionviews.show_filter', true);
	        $event->attributes['mb-discussionviews.abbr_numbers'] = $this->settings->get('michaelbelgium-discussionviews.abbr_numbers', false);
	        $event->attributes['mb-discussionviews.show_viewlist'] = $this->settings->get('michaelbelgium-discussionviews.show_viewlist', true);
        }
    }
}
