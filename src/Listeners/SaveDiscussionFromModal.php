<?php
namespace Michaelbelgium\Discussionviews\Listeners;

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
		if(isset($event->data["attributes"]["resetViews"]) && $event->data["attributes"]["resetViews"] === true)
		{
			$discussion = $event->discussion;

			$discussion->views()->delete();

			//for the (un)popular filter
			$discussion->view_count = $discussion->views()->count();
			$discussion->save();
		}
	}
}
