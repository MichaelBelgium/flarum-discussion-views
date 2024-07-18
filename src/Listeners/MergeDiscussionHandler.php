<?php

namespace Michaelbelgium\Discussionviews\Listeners;


use Flarum\Discussion\Discussion;
use FoF\MergeDiscussions\Events\MergingDiscussions;

class MergeDiscussionHandler
{
    public function handle(MergingDiscussions $event)
    {
        $targetDiscussion = $event->discussion;

        $targetDiscussion->increment('view_count', $event->mergedDiscussions->sum('view_count'));
        $targetDiscussion->save();

        $event->mergedDiscussions->each(function(Discussion $discussion) use ($targetDiscussion) {
            $discussion->views()->update(['discussion_id' => $targetDiscussion->id]);
        });
    }
}
