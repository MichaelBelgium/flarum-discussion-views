<?php

namespace michaelbelgium\views\events;


use Flarum\Discussion\Discussion;
use Flarum\User\User;

class DiscussionWasViewed
{
    /** @var User $viewer */
    private $viewer;

    /** @var Discussion $discussion */
    private $discussion;

    /**
     * DiscussionWasViewed constructor.
     *
     * @param User $viewer
     * @param Discussion $discussion
     */
    public function __construct(User $viewer, Discussion $discussion)
    {
        $this->viewer = $viewer;
        $this->discussion = $discussion;
    }
}