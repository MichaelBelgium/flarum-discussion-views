<?php

namespace Michaelbelgium\Discussionviews\Archive;

use Illuminate\Database\ConnectionInterface;

class DiscussionViewArchiver
{
    public const RETAINED_VIEWS = 1000;

    private const DELETE_BATCH_SIZE = 5000;
    private const DISCUSSION_PAGE_SIZE = 500;

    private ConnectionInterface $database;

    public function __construct(ConnectionInterface $database)
    {
        $this->database = $database;
    }

    /**
     * @return array{discussions: int, views: int}
     */
    public function archive(): array
    {
        $archivedDiscussions = 0;
        $archivedViews = 0;
        $lastDiscussionId = 0;

        do {
            $discussionIds = $this->candidateDiscussionIdsAfter($lastDiscussionId);

            foreach ($discussionIds as $discussionId) {
                $lastDiscussionId = (int) $discussionId;
                $deleted = $this->archiveDiscussion($lastDiscussionId);

                if ($deleted > 0) {
                    $archivedDiscussions++;
                    $archivedViews += $deleted;
                }
            }
        } while ($discussionIds->isNotEmpty());

        return [
            'discussions' => $archivedDiscussions,
            'views' => $archivedViews,
        ];
    }

    private function candidateDiscussionIdsAfter(int $discussionId)
    {
        return $this->database->table('discussions')
            ->leftJoin('discussion_view_archives', 'discussion_view_archives.discussion_id', '=', 'discussions.id')
            ->where('discussions.id', '>', $discussionId)
            ->whereRaw(
                'discussions.view_count > COALESCE(discussion_view_archives.archived_view_count, 0) + ?',
                [self::RETAINED_VIEWS]
            )
            ->orderBy('discussions.id')
            ->limit(self::DISCUSSION_PAGE_SIZE)
            ->pluck('discussions.id');
    }

    private function archiveDiscussion(int $discussionId): int
    {
        $deletedTotal = 0;

        do {
            $deleted = $this->archiveBatch($discussionId);
            $deletedTotal += $deleted;
        } while ($deleted > 0);

        return $deletedTotal;
    }

    private function archiveBatch(int $discussionId): int
    {
        return $this->database->transaction(function () use ($discussionId) {
            $this->database->table('discussion_view_archives')->insertOrIgnore([
                'discussion_id' => $discussionId,
                'archived_view_count' => 0,
            ]);

            // Serializes manual and scheduled archivers for the same discussion.
            $this->database->table('discussion_view_archives')
                ->where('discussion_id', $discussionId)
                ->lockForUpdate()
                ->first();

            $discussion = $this->database->table('discussions')
                ->where('id', $discussionId)
                ->lockForUpdate()
                ->first(['view_count']);

            if ($discussion === null) {
                return 0;
            }

            $views = $this->database->table('discussion_views')
                ->where('discussion_id', $discussionId)
                ->orderByDesc('visited_at')
                ->orderByDesc('id')
                ->offset(self::RETAINED_VIEWS)
                ->limit(self::DELETE_BATCH_SIZE)
                ->get(['id', 'ip']);

            if ($views->isEmpty()) {
                $retainedViewCount = $this->database->table('discussion_views')
                    ->where('discussion_id', $discussionId)
                    ->count();

                $this->database->table('discussion_view_archives')
                    ->where('discussion_id', $discussionId)
                    ->update([
                        'archived_view_count' => max(0, (int) $discussion->view_count - $retainedViewCount),
                    ]);

                return 0;
            }

            $uniqueIps = $views
                ->pluck('ip')
                ->filter()
                ->unique()
                ->map(function ($ip) use ($discussionId) {
                    return [
                        'discussion_id' => $discussionId,
                        'ip' => $ip,
                    ];
                })
                ->values()
                ->all();

            if (! empty($uniqueIps)) {
                $this->database->table('discussion_view_uniques')->insertOrIgnore($uniqueIps);
            }

            $deleted = $this->database->table('discussion_views')
                ->whereIn('id', $views->pluck('id')->all())
                ->where('discussion_id', $discussionId)
                ->delete();

            if ($deleted > 0) {
                $this->database->table('discussion_view_archives')
                    ->where('discussion_id', $discussionId)
                    ->increment('archived_view_count', $deleted);
            }

            return $deleted;
        });
    }
}
