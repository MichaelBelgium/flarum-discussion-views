<?php

use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Michaelbelgium\Discussionviews\Listeners;
use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;
use Flarum\Extend\Model;
use Flarum\Settings\SettingsRepositoryInterface;
use Michaelbelgium\Discussionviews\Listeners\AddRelationship;
use Michaelbelgium\Discussionviews\Models\DiscussionView;

$settings = app(SettingsRepositoryInterface::class);

return [
    (new Frontend('forum'))
        ->css(__DIR__ . '/less/extension.less')
        ->js(__DIR__. '/js/dist/forum.js'),

    (new Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    (new Model(Discussion::class))->relationship(AddRelationship::RELATIONSHIP, function (AbstractModel $model) {
        return $model->hasMany(DiscussionView::class)->orderBy('visited_at', 'DESC');
    })->relationship(AddRelationship::RELATIONSHIP_LATEST, function (AbstractModel $model) use ($settings) {
        return $model->views()->limit($settings->get('michaelbelgium-discussionviews.max_listcount', 5));
    }),

    function (Dispatcher $events) {
        $events->subscribe(Listeners\AddRelationship::class);
        $events->subscribe(Listeners\AddDiscussionViewHandler::class);
        $events->subscribe(Listeners\AddPopularSort::class);
        $events->subscribe(Listeners\SaveDiscussionFromModal::class);
        $events->subscribe(Listeners\SettingsToForum::class);
    }
]; 
