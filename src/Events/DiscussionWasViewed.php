<?php

namespace Michaelbelgium\Discussionviews\Events;


use Flarum\Discussion\Discussion;
use Flarum\User\User;

class DiscussionWasViewed
{
    public function __construct(
        private User $viewer,
        private Discussion $discussion
    ) {}

    public function getViewer()
    {
        return $this->viewer;
    }

    public function getDiscussion()
    {
        return $this->discussion;
    }
}