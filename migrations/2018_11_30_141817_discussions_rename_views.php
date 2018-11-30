<?php

use Flarum\Database\Migration;

return Migration::renameColumn("discussions", "views", "view_count");