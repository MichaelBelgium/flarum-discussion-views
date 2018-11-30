<?php

use Flarum\Database\Migration;

return Migration::addColumns("discussions", [
    "views" => ["integer", "default" => 0]
]);