<?php

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Builder;

return Migration::addSettings([
    'michaelbelgium-discussionviews.track_unique' => false,
    'michaelbelgium-discussionviews.show_filter' => true,
    'michaelbelgium-discussionviews.abbr_numbers' => false
]);
