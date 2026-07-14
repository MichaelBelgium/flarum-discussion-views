<?php

namespace Michaelbelgium\Discussionviews\Console;

use Flarum\Console\AbstractCommand;
use Michaelbelgium\Discussionviews\Archive\DiscussionViewArchiver;

class ArchiveDiscussionViewsCommand extends AbstractCommand
{
    private DiscussionViewArchiver $archiver;

    public function __construct(DiscussionViewArchiver $archiver)
    {
        parent::__construct();

        $this->archiver = $archiver;
    }

    protected function configure()
    {
        $this
            ->setName('discussion-views:archive')
            ->setDescription('Archive old discussion view records');
    }

    protected function fire()
    {
        $result = $this->archiver->archive();

        $this->info(sprintf(
            'Archived %d view records from %d discussions.',
            $result['views'],
            $result['discussions']
        ));
    }
}
