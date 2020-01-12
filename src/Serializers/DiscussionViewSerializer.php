<?php
namespace Michaelbelgium\Discussionviews\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Api\Serializer\UserSerializer;

class DiscussionViewSerializer extends AbstractSerializer
{
    protected $type = 'discussionviews'; //used on line app.store.models.$type in javascript

    protected function getDefaultAttributes($discussionView)
    {
        return [
            'visited_at' => $this->formatDate($discussionView->visited_at)
        ];
    }

    protected function user($discussionView) //same function name of relationship from model
    {
        return $this->hasOne($discussionView, UserSerializer::class);
    }

    protected function discussion($discussionView) //same function name of relationship from model
    {
        return $this->hasOne($discussionView, DiscussionSerializer::class);
    }
}