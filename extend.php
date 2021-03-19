<?php

use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Extend\ApiSerializer;
use Michaelbelgium\Discussionviews\Listeners;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;
use Flarum\Extend\Model;
use Flarum\Settings\SettingsRepositoryInterface;
use Michaelbelgium\Discussionviews\Models\DiscussionView;

$settings = app(SettingsRepositoryInterface::class);

return [
    (new Frontend('forum'))
        ->css(__DIR__ . '/less/extension.less')
        ->js(__DIR__. '/js/dist/forum.js'),

    (new Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    (new Model(Discussion::class))->relationship(Listeners\AddRelationship::RELATIONSHIP, function (AbstractModel $model) {
        return $model->hasMany(DiscussionView::class)->orderBy('visited_at', 'DESC');
    })->relationship(Listeners\AddRelationship::RELATIONSHIP_LATEST, function (AbstractModel $model) use ($settings) {
        return $model->views()->limit($settings->get('michaelbelgium-discussionviews.max_listcount', 5));
    }),


    (new ApiSerializer(DiscussionSerializer::class))
        ->attribute('canReset', function (DiscussionSerializer $serializer, $discussion) {
            return (bool)$serializer->getActor()->can('discussion.resetViews', $discussion);
        })->attribute('viewCount', function (DiscussionSerializer $serializer, $discussion) {
            return $discussion->view_count;
        })->attribute('canViewNumber', function (DiscussionSerializer $serializer, $discussion) {
            return (bool)$serializer->getActor()->can('discussion.readViewnumber', $discussion);
        }),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddRelationship::class);
        $events->subscribe(Listeners\AddDiscussionViewHandler::class);
        $events->subscribe(Listeners\AddPopularSort::class);
        $events->subscribe(Listeners\SaveDiscussionFromModal::class);
        $events->subscribe(Listeners\SettingsToForum::class);
    }
]; 
