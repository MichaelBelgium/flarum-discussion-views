<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('discussion_views', function (Blueprint $table) {
            $table->index(['discussion_id', 'visited_at', 'id'], 'discussion_views_discussion_visited_index');
            $table->index(['discussion_id', 'ip'], 'discussion_views_discussion_ip_index');
            $table->index(['discussion_id', 'user_id', 'visited_at'], 'discussion_views_discussion_user_index');
        });

        $schema->table('discussions', function (Blueprint $table) {
            $table->index('view_count', 'discussions_view_count_index');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('discussions', function (Blueprint $table) {
            $table->dropIndex('discussions_view_count_index');
        });

        $schema->table('discussion_views', function (Blueprint $table) {
            $table->dropIndex('discussion_views_discussion_visited_index');
            $table->dropIndex('discussion_views_discussion_ip_index');
            $table->dropIndex('discussion_views_discussion_user_index');
        });
    }
];
