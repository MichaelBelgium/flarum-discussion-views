<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->create('discussion_view_archives', function (Blueprint $table) {
            $table->unsignedInteger('discussion_id')->primary();
            $table->unsignedBigInteger('archived_view_count')->default(0);

            $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('CASCADE')->onUpdate('CASCADE');
        });

        // This registry preserves all-time IP uniqueness without retaining old visit details.
        $schema->create('discussion_view_uniques', function (Blueprint $table) {
            $table->unsignedInteger('discussion_id');
            $table->string('ip', 45);

            $table->primary(['discussion_id', 'ip']);
            $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('CASCADE')->onUpdate('CASCADE');
        });

        $schema->table('discussion_views', function (Blueprint $table) {
            $table->index(['discussion_id', 'visited_at', 'id'], 'discussion_views_retention_index');
            $table->index(['discussion_id', 'ip'], 'discussion_views_ip_index');
            $table->index(['discussion_id', 'user_id', 'visited_at'], 'discussion_views_user_visited_index');
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
            $table->dropIndex('discussion_views_retention_index');
            $table->dropIndex('discussion_views_ip_index');
            $table->dropIndex('discussion_views_user_visited_index');
        });

        $schema->dropIfExists('discussion_view_uniques');
        $schema->dropIfExists('discussion_view_archives');
    }
];
