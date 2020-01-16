<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable('discussion_views', function(Blueprint $table) {
    $table->increments('id');
    $table->unsignedInteger('user_id')->nullable();
    $table->unsignedInteger('discussion_id');
    $table->string('ip', 16);
    $table->dateTime('visited_at');

    $table->foreign('discussion_id')->references('id')->on('discussions')->onDelete('CASCADE')->onUpdate('CASCADE');
    $table->foreign('user_id')->references('id')->on('users')->onDelete('CASCADE')->onUpdate('CASCADE');
});