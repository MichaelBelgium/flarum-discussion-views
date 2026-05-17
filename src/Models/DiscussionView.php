<?php

namespace Michaelbelgium\Discussionviews\Models;

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\User\User;

class DiscussionView extends AbstractModel 
{
    protected $casts = [
        'visited_at' => 'datetime',
    ];

    public function discussion() {
        return $this->belongsTo(Discussion::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
