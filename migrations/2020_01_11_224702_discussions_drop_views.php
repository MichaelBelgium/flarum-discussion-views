<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return Migration::dropColumns('discussions', [
    "view_count" => ["integer", "default" => 0]
]);
