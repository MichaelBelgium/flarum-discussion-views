<?php

namespace Michaelbelgium\Discussionviews;

use Flarum\Discussion\Discussion;
use Flarum\Http\SlugManager;
use Flarum\User\User;
use Michaelbelgium\Discussionviews\Models\DiscussionView;

/**
 * Builds the list of distinct logged-in viewers of a discussion as plain arrays, most recent first.
 *
 * Deliberately not a JSON:API relationship: serializing every viewer as its own resource (plus a full user
 * resource with groups and permission checks) is what makes discussions with many viewers take seconds.
 */
class UniqueViewers
{
    public function __construct(
        private readonly SlugManager $slugManager
    ) {}

    public function __invoke(Discussion $discussion): array
    {
        $lastVisits = DiscussionView::query()
            ->select('user_id')
            ->selectRaw('MAX(visited_at) as last_visited_at')
            ->where('discussion_id', $discussion->id)
            ->whereNotNull('user_id')
            ->groupBy('user_id');

        // User models (not raw rows) so display name, slug and avatar drivers from other extensions are respected.
        $users = User::query()
            ->select('users.*')
            ->joinSub($lastVisits, 'last_visits', 'last_visits.user_id', '=', 'users.id')
            ->orderByDesc('last_visits.last_visited_at')
            ->get();

        $slugDriver = $this->slugManager->forResource(User::class);

        return $users->map(fn (User $user) => [
            'id' => (string) $user->id,
            'username' => $user->username,
            'displayName' => $user->display_name,
            'slug' => $slugDriver->toSlug($user),
            'avatarUrl' => $user->avatar_url,
            'avatarSrcset' => $user->avatar_srcset,
        ])->all();
    }
}
