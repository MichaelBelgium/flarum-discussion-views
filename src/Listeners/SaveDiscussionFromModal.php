<?php
namespace Michaelbelgium\Discussionviews\Listeners;

use Flarum\Discussion\Event\Saving;

class SaveDiscussionFromModal
{
	public function handle(Saving $event)
	{
		if(isset($event->data["attributes"]["resetViews"]) && $event->data["attributes"]["resetViews"] === true)
		{
			$discussion = $event->discussion;

			$discussion->views()->delete();

			//for the (un)popular filter
			$discussion->view_count = 0;
			$discussion->save();
		}
	}
}
