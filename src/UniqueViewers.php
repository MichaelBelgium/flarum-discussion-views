<?php

namespace Michaelbelgium\Discussionviews;

use Flarum\Discussion\Discussion;
use Flarum\Http\SlugManager;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Michaelbelgium\Discussionviews\Models\DiscussionView;

/**
 * Builds the list of distinct logged-in viewers of a discussion as plain arrays, most recent first.
 */
class UniqueViewers
{
    public const int DEFAULT_PAGE_SIZE = 50;
    public const int MAX_PAGE_SIZE = 100;

    public function __construct(private readonly SlugManager $slugManager) {}

    /**
     * @return array{total: int, viewers: array, nextOffset: int} There are more viewers while nextOffset < total.
     */
    public function page(Discussion $discussion, User $actor, int $offset, int $limit): array
    {
        $rows = $this->groupedViewers($discussion->id)
            ->selectRaw('COUNT(*) OVER () as total')
            ->offset($offset)
            ->limit($limit)
            ->get();

        return [
            'total' => (int) ($rows->first()?->total ?? 0),
            'viewers' => $this->viewers($rows->pluck('user_id'), $actor),
            'nextOffset' => $offset + $rows->count(),
        ];
    }

    private function groupedViewers(int $discussion_id): Builder
    {
        return DiscussionView::query()
            ->select('user_id')
            ->where('discussion_id', $discussion_id)
            ->whereNotNull('user_id')
            ->groupBy('user_id')
            ->orderByRaw('MAX(visited_at) DESC')
            ->orderByDesc('user_id');
    }

    private function viewers(Collection $userIds, User $actor): array
    {
        $users = User::query()
            ->whereVisibleTo($actor)
            ->whereIn('id', $userIds)
            ->get()
            ->keyBy('id');

        $slugDriver = $this->slugManager->forResource(User::class);

        return $userIds
            ->map(fn ($id) => $users->get($id))
            ->filter() // exclude any falsy values
            ->map(fn (User $user) => [
                'id' => (string) $user->id,
                'username' => $user->username,
                'displayName' => $user->display_name,
                'slug' => $slugDriver->toSlug($user),
                'avatarUrl' => $user->avatar_url,
            ])
            ->values()
            ->all();
    }
}
