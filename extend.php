<?php

use Flarum\Api\Context;
use Flarum\Api\Resource\DiscussionResource;
use Flarum\Api\Schema;
use Flarum\Api\Sort\SortColumn;
use Flarum\Database\AbstractModel;
use Flarum\Discussion\Discussion;
use Flarum\Extend\ApiResource;
use Flarum\Extend\Conditional;
use Flarum\Extend\Event;
use Flarum\Extend\Frontend;
use Flarum\Extend\Locales;
use Flarum\Extend\Model;
use Flarum\Extend\Settings;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\MergeDiscussions\Events\MergingDiscussions;
use Michaelbelgium\Discussionviews\Listeners;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Michaelbelgium\Discussionviews\Resource\DiscussionViewResource;

$settings = resolve(SettingsRepositoryInterface::class);

const DV_RELATIONSHIP_UNIQUE = 'uniqueViews'; //discussion->uniqueViews()
const DV_RELATIONSHIP = 'views'; //$discussion->views()
const DV_RELATIONSHIP_LATEST = 'latestViews';

return [
    new Frontend('forum')
        ->css(__DIR__ . '/less/extension.less')
        ->js(__DIR__. '/js/dist/forum.js'),

    new Frontend('admin')
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    new Model(Discussion::class)
        ->relationship(DV_RELATIONSHIP, fn (AbstractModel $model) =>
            $model->hasMany(DiscussionView::class)->orderBy('visited_at', 'DESC')
        )->relationship(DV_RELATIONSHIP_LATEST, fn (AbstractModel $model) =>
            $model->{DV_RELATIONSHIP}()->limit($settings->get('michaelbelgium-discussionviews.max_listcount', 5))
        )->relationship(DV_RELATIONSHIP_UNIQUE, fn (AbstractModel $model) =>
            $model->hasMany(DiscussionView::class)
                ->whereNotNull('user_id')
                ->groupBy('user_id')
                ->orderByRaw('MAX(visited_at) DESC')
        ),

    new Settings()
        ->default('michaelbelgium-discussionviews.show_footer_viewlist', false)
        ->default('michaelbelgium-discussionviews.track_guests', true)
        ->default('michaelbelgium-discussionviews.max_listcount', 5)
        ->default('michaelbelgium-discussionviews.show_viewlist', true)
        ->default('michaelbelgium-discussionviews.track_unique', false)
        ->default('michaelbelgium-discussionviews.show_filter', true)
        ->default('michaelbelgium-discussionviews.abbr_numbers', false)
        ->default('michaelbelgium-discussionviews.ignore_crawlers', false)
        ->serializeToForum('toggleFilter', 'michaelbelgium-discussionviews.show_filter')
        ->serializeToForum('abbrNumber', 'michaelbelgium-discussionviews.abbr_numbers')
        ->serializeToForum('showViewList', 'michaelbelgium-discussionviews.show_viewlist')
        ->serializeToForum('showFooterViewList', 'michaelbelgium-discussionviews.show_footer_viewlist')
        ->serializeToForum('maxListCount', 'michaelbelgium-discussionviews.max_listcount'),

    new ApiResource(DiscussionResource::class)
        ->fields(fn() => [
            Schema\Boolean::make('canReset')
                ->get(fn (Discussion $model, Context $context) => $context->getActor()->can('resetViews', $model)),

            Schema\Boolean::make('canViewNumber')
                ->get(fn (Discussion $model, Context $context) => $context->getActor()->can('readViewnumber', $model)),

            Schema\Integer::make('viewCount')
                ->property('view_count'),

            Schema\Relationship\ToMany::make(DV_RELATIONSHIP_LATEST)
                ->includable()
                ->type('discussionview'),

            Schema\Relationship\ToMany::make(DV_RELATIONSHIP_UNIQUE)
                ->includable()
                ->type('discussionview'),

            Schema\Boolean::make('resetViews')
                ->writable(fn (Discussion $model, Context $context) =>
                    $context->updating() && $context->getActor()->can('resetViews', $model)
                )
                ->set(function (Discussion $model, bool $value, Context $context) {
                    if ($value) {
                        $model->views()->delete();
                        $model->view_count = 0;
                    }
                }),

        ])->endpoint('show', fn (\Flarum\Api\Endpoint\Show $endpoint) =>
            $endpoint->beforeSerialization(function (Context $context, Discussion $discussion) {
                resolve(Listeners\AddDiscussionViewHandler::class)($context, $discussion);
            })->addDefaultInclude([DV_RELATIONSHIP_LATEST, DV_RELATIONSHIP_UNIQUE, DV_RELATIONSHIP_UNIQUE.'.user', DV_RELATIONSHIP_LATEST. '.user'])
        )->sorts(fn () => [
            SortColumn::make('view_count'),
        ]),

    new Conditional()
        ->whenExtensionEnabled('fof-merge-discussions', fn() => [
            new Event()
                ->listen(MergingDiscussions::class, Listeners\MergeDiscussionHandler::class),
        ]),

    new ApiResource(DiscussionViewResource::class),
];