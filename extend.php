<?php

use Flarum\Api\Controller\ListDiscussionsController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Serializer\DiscussionSerializer;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Discussion\Event\Saving;
use Flarum\Extend\ApiController;
use Flarum\Extend\ApiSerializer;
use Flarum\Extend\Conditional;
use Flarum\Extend\Event;
use FoF\MergeDiscussions\Events\MergingDiscussions;
use Michaelbelgium\Discussionviews\Listeners;
use Flarum\Extend\Locales;
use Flarum\Extend\Frontend;
use Flarum\Extend\Model;
use Flarum\Extend\Settings;
use Flarum\Settings\SettingsRepositoryInterface;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Michaelbelgium\Discussionviews\Serializers\DiscussionViewSerializer;

$settings = resolve(SettingsRepositoryInterface::class);

const DV_RELATIONSHIP_UNIQUE = 'uniqueViews'; //discussion->uniqueViews()
const DV_RELATIONSHIP = 'views'; //$discussion->views()
const DV_RELATIONSHIP_LATEST = 'latestViews';

return [
    (new Frontend('forum'))
        ->css(__DIR__ . '/less/extension.less')
        ->js(__DIR__. '/js/dist/forum.js'),

    (new Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    (new Model(Discussion::class))
        ->relationship(DV_RELATIONSHIP, function (AbstractModel $model) {
            return $model->hasMany(DiscussionView::class)->orderBy('visited_at', 'DESC');
        })->relationship(DV_RELATIONSHIP_LATEST, function (AbstractModel $model) use ($settings) {
            return $model->views()->limit($settings->get('michaelbelgium-discussionviews.max_listcount', 5));
        })->relationship(DV_RELATIONSHIP_UNIQUE, function (AbstractModel $model) use ($settings) {
            return $model->hasMany(DiscussionView::class)->groupBy('user_id')->havingRaw('user_id IS NOT NULL')->orderByRaw('MAX(visited_at) DESC')
                ->limit($settings->get('michaelbelgium-discussionviews.max_listcount', 5));
        }),

    (new Settings)
        ->default('michaelbelgium-discussionviews.show_footer_viewlist', false)
        ->default('michaelbelgium-discussionviews.track_guests', true)
        ->default('michaelbelgium-discussionviews.max_listcount', 5)
        ->default('michaelbelgium-discussionviews.show_viewlist', true)
        ->default('michaelbelgium-discussionviews.track_unique', false)
        ->default('michaelbelgium-discussionviews.show_filter', true)
        ->default('michaelbelgium-discussionviews.abbr_numbers', false)
        ->default('michaelbelgium-discussionviews.ignore_crawlers', false)
        ->serializeToForum('toggleFilter', 'michaelbelgium-discussionviews.show_filter', null, true)
        ->serializeToForum('abbrNumber', 'michaelbelgium-discussionviews.abbr_numbers', null, false)
        ->serializeToForum('showViewList', 'michaelbelgium-discussionviews.show_viewlist', null, true)
        ->serializeToForum('showFooterViewList', 'michaelbelgium-discussionviews.show_footer_viewlist', null, false),

    (new ApiSerializer(DiscussionSerializer::class))
        ->attribute('canReset', function (DiscussionSerializer $serializer, $discussion) {
            return (bool)$serializer->getActor()->can('resetViews', $discussion);
        })->attribute('viewCount', function (DiscussionSerializer $serializer, $discussion) {
            return $discussion->view_count;
        })->attribute('canViewNumber', function (DiscussionSerializer $serializer, $discussion) {
            return (bool)$serializer->getActor()->can('readViewnumber', $discussion);
        })->hasMany(DV_RELATIONSHIP_LATEST, DiscussionViewSerializer::class)
        ->hasMany(DV_RELATIONSHIP_UNIQUE, DiscussionViewSerializer::class),

    (new ApiController(ShowDiscussionController::class))
        ->prepareDataForSerialization(Listeners\AddDiscussionViewHandler::class)
        ->addInclude([
            DV_RELATIONSHIP_UNIQUE, DV_RELATIONSHIP_UNIQUE . '.user',
            DV_RELATIONSHIP_LATEST, DV_RELATIONSHIP_LATEST . '.user'
        ]),

    (new ApiController(ListDiscussionsController::class))
        ->addSortField('view_count'),

    (new Event())
        ->listen(Saving::class, Listeners\SaveDiscussionFromModal::class),

    (new Conditional())
        ->whenExtensionEnabled('fof-merge-discussions', function() {
            return [
                (new Event())
                    ->listen(MergingDiscussions::class, Listeners\MergeDiscussionHandler::class),
            ];
        })
];