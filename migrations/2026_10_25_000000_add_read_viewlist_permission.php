<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'discussion.readViewlist' => Group::GUEST_ID,
]);
