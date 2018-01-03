<?php
namespace michaelbelgium\views\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\DiscussionWillBeSaved;

class SaveDiscussionFromModal
{
	public function subscribe(Dispatcher $events)
	{
		$events->listen(DiscussionWillBeSaved::class, [$this, 'OnDiscussionGetSaved']);
	}

	public function OnDiscussionGetSaved(DiscussionWillBeSaved $event)
	{
		if(isset($event->data["attributes"]["views"]))
		{
			$discussion = $event->discussion;

			$discussion->views = $event->data["attributes"]["views"];
			$discussion->save();
		}
	}
}
