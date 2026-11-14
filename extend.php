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
use Flarum\Extend\Routes;
use Flarum\Extend\Settings;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\MergeDiscussions\Events\MergingDiscussions;
use Michaelbelgium\Discussionviews\Api\ListUniqueViewersController;
use Michaelbelgium\Discussionviews\Listeners;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Michaelbelgium\Discussionviews\Resource\DiscussionViewResource;
use Michaelbelgium\Discussionviews\UniqueViewers;

$settings = resolve(SettingsRepositoryInterface::class);
$relationship = 'views'; //$discussion->views()
$relationshipLatest = 'latestViews';

$defaultIncludes = [];

if ($settings->get('michaelbelgium-discussionviews.show_viewlist', true)) {
    array_push($defaultIncludes, $relationshipLatest, $relationshipLatest . '.user');
}

return [
    new Frontend('forum')
        ->css(__DIR__ . '/less/extension.less')
        ->js(__DIR__. '/js/dist/forum.js'),

    new Frontend('admin')
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Locales(__DIR__ . '/locale'),

    new Model(Discussion::class)
        ->relationship($relationship, fn (AbstractModel $model) =>
            $model->hasMany(DiscussionView::class)->orderBy('visited_at', 'DESC')->orderBy('id', 'DESC')
        )->relationship($relationshipLatest, fn (AbstractModel $model) =>
            $model->{$relationship}()->limit($settings->get('michaelbelgium-discussionviews.max_listcount', 5))
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
        ->serializeToForum('showFooterViewList', 'michaelbelgium-discussionviews.show_footer_viewlist'),

    new ApiResource(DiscussionResource::class)
        ->fields(fn() => [
            Schema\Boolean::make('canReset')
                ->get(fn (Discussion $model, Context $context) => $context->getActor()->can('resetViews', $model)),

            Schema\Boolean::make('canViewNumber')
                ->get(fn (Discussion $model, Context $context) => $context->getActor()->can('readViewnumber', $model)),

            Schema\Boolean::make('canViewList')
                ->get(fn (Discussion $model, Context $context) => $context->getActor()->can('readViewlist', $model)),

            Schema\Integer::make('viewCount')
                ->property('view_count')
                ->visible(fn (Discussion $model, Context $context) =>
                    $context->getActor()->can('readViewnumber', $model) || $context->getActor()->can('resetViews', $model)
                ),

            Schema\Relationship\ToMany::make($relationshipLatest)
                ->includable()
                ->visible(fn (Discussion $model, Context $context) => $context->getActor()->can('readViewlist', $model))
                ->type('discussionview'),

            Schema\Arr::make('uniqueViewers')
                ->visible(fn (Discussion $model, Context $context) =>
                    $context->showing(DiscussionResource::class)
                    && $settings->get('michaelbelgium-discussionviews.show_footer_viewlist')
                    && $context->getActor()->can('readViewlist', $model)
                )
                ->get(fn (Discussion $model, Context $context) =>
                    resolve(UniqueViewers::class)->page(
                        $model,
                        $context->getActor(),
                        0,
                        (int) $settings->get('michaelbelgium-discussionviews.max_listcount')
                    )
                ),

            Schema\Boolean::make('resetViews')
                ->visible(false)
                ->writable(fn (Discussion $model, Context $context) =>
                    $context->updating() && $context->getActor()->can('resetViews', $model)
                )
                ->set(function (Discussion $model, bool $value) {
                    if ($value) {
                        $model->view_count = 0;
                        $model->afterSave(fn (Discussion $model) => $model->views()->delete());
                    }
                }),

        ])->endpoint('show', fn (\Flarum\Api\Endpoint\Show $endpoint) =>
            $endpoint->beforeSerialization(function (Context $context, Discussion $discussion) {
                resolve(Listeners\AddDiscussionViewHandler::class)($context, $discussion);
            })->addDefaultInclude($defaultIncludes)
        )->sorts(fn () => [
            SortColumn::make('view_count'),
        ]),

    new Conditional()
        ->whenExtensionEnabled('fof-merge-discussions', fn() => [
            new Event()
                ->listen(MergingDiscussions::class, Listeners\MergeDiscussionHandler::class),
        ]),

    new ApiResource(DiscussionViewResource::class),

    new Routes('api')
        ->get('/discussions/{id}/viewers', 'discussions.viewers', ListUniqueViewersController::class),
];