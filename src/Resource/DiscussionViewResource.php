<?php

namespace Michaelbelgium\Discussionviews\Resource;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;
use Flarum\Api\Sort\SortColumn;
use Illuminate\Database\Eloquent\Builder;
use MichaelBelgium;
use Michaelbelgium\Discussionviews\Models\DiscussionView;
use Tobyz\JsonApiServer\Context as OriginalContext;

/**
 * @extends Resource\AbstractDatabaseResource<DiscussionView>
 */
class DiscussionViewResource extends Resource\AbstractDatabaseResource
{
    public function type(): string
    {
        return 'discussionview';
    }

    public function model(): string
    {
        return DiscussionView::class;
    }

    public function fields(): array
    {
        return [
            Schema\DateTime::make('visitedAt'),

            Schema\Relationship\ToOne::make('user')
                ->includable()
                ->writableOnCreate()
                ->requiredOnCreate()
                ->type('users'),

            Schema\Relationship\ToOne::make('discussion')
                ->includable()
                ->requiredOnCreate()
                ->type('discussions'),
        ];
    }
}
