<?php
namespace Michaelbelgium\Discussionviews\Listeners;

use Flarum\Discussion\Event\Saving;
use Illuminate\Database\ConnectionInterface;

class SaveDiscussionFromModal
{
	private ConnectionInterface $database;

	public function __construct(ConnectionInterface $database)
	{
		$this->database = $database;
	}

	public function handle(Saving $event)
	{
		if(isset($event->data["attributes"]["resetViews"]) && $event->data["attributes"]["resetViews"] === true)
		{
			$discussion = $event->discussion;

			$this->database->transaction(function () use ($discussion) {
				$this->database->table('discussion_view_archives')->insertOrIgnore([
					'discussion_id' => $discussion->id,
					'archived_view_count' => 0,
				]);
				$this->database->table('discussion_view_archives')
					->where('discussion_id', $discussion->id)
					->lockForUpdate()
					->first();
				$this->database->table('discussions')
					->where('id', $discussion->id)
					->lockForUpdate()
					->first();

				$this->database->table('discussion_view_uniques')->where('discussion_id', $discussion->id)->delete();
				$discussion->views()->delete();
				$this->database->table('discussion_view_archives')->where('discussion_id', $discussion->id)->delete();

				$discussion->view_count = 0;
				$discussion->save();
			});
		}
	}
}
