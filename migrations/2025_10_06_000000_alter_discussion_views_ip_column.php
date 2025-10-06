<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('discussion_views', function (Blueprint $table) {
            // A varchar length of 45 is recommended for IPv6 addresses.
            $table->string('ip', 45)->change();
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('discussion_views', function (Blueprint $table) {
            $table->string('ip', 16)->change();
        });
    }
];