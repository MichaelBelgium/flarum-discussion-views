<?php

use Flarum\Database\Migration;

return Migration::addSettings([
    'michaelbelgium-discussionviews.track_unique' => false,
    'michaelbelgium-discussionviews.show_filter' => true,
    'michaelbelgium-discussionviews.abbr_numbers' => false
]);
