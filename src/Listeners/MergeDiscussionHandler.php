<?php

namespace Michaelbelgium\Discussionviews\Listeners;


use FoF\MergeDiscussions\Events\MergingDiscussions;
use Illuminate\Database\ConnectionInterface;

class MergeDiscussionHandler
{
    private ConnectionInterface $database;

    public function __construct(ConnectionInterface $database)
    {
        $this->database = $database;
    }

    public function handle(MergingDiscussions $event)
    {
        $targetDiscussion = $event->discussion;
        $mergedIds = $event->mergedDiscussions
            ->pluck('id')
            ->reject(function ($id) use ($targetDiscussion) {
                return (int) $id === (int) $targetDiscussion->id;
            })
            ->values()
            ->all();

        if (empty($mergedIds)) {
            return;
        }

        $this->database->transaction(function () use ($event, $mergedIds, $targetDiscussion) {
            $discussionIds = array_merge([$targetDiscussion->id], $mergedIds);
            $archiveRows = array_map(function ($discussionId) {
                return [
                    'discussion_id' => $discussionId,
                    'archived_view_count' => 0,
                ];
            }, $discussionIds);

            $this->database->table('discussion_view_archives')->insertOrIgnore($archiveRows);
            $this->database->table('discussion_view_archives')
                ->whereIn('discussion_id', $discussionIds)
                ->orderBy('discussion_id')
                ->lockForUpdate()
                ->get();
            $this->database->table('discussions')
                ->whereIn('id', $discussionIds)
                ->orderBy('id')
                ->lockForUpdate()
                ->get();

            $targetDiscussion->increment('view_count', $event->mergedDiscussions->sum('view_count'));

            $this->database->table('discussion_views')
                ->whereIn('discussion_id', $mergedIds)
                ->update(['discussion_id' => $targetDiscussion->id]);

            $archivedCount = $this->database->table('discussion_view_archives')
                ->whereIn('discussion_id', $mergedIds)
                ->sum('archived_view_count');

            if ($archivedCount > 0) {
                $this->database->table('discussion_view_archives')
                    ->where('discussion_id', $targetDiscussion->id)
                    ->increment('archived_view_count', $archivedCount);
            }

            $this->database->table('discussion_view_uniques')
                ->whereIn('discussion_id', $mergedIds)
                ->orderBy('discussion_id')
                ->orderBy('ip')
                ->chunk(1000, function ($uniques) use ($targetDiscussion) {
                    $rows = $uniques->map(function ($unique) use ($targetDiscussion) {
                        return [
                            'discussion_id' => $targetDiscussion->id,
                            'ip' => $unique->ip,
                        ];
                    })->all();

                    $this->database->table('discussion_view_uniques')->insertOrIgnore($rows);
                });

            $this->database->table('discussion_view_uniques')->whereIn('discussion_id', $mergedIds)->delete();
            $this->database->table('discussion_view_archives')->whereIn('discussion_id', $mergedIds)->delete();
        });
    }
}
