<?php
namespace michaelbelgium\views\listeners;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Discussion\Event\Saving;

class SaveDiscussionFromModal
{
	public function subscribe(Dispatcher $events)
	{
		$events->listen(Saving::class, [$this, 'OnDiscussionGetSaved']);
	}

	public function OnDiscussionGetSaved(Saving $event)
	{
		if(isset($event->data["attributes"]["views"]))
		{
			$discussion = $event->discussion;

			$discussion->view_count = $event->data["attributes"]["views"];
			$discussion->save();
		}
	}
}
