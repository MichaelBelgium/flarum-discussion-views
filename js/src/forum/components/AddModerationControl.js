import { extend } from 'flarum/extend';
import Button from 'flarum/components/Button';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import ResetDiscussionViewsModal from './ResetDiscussionViewsModal';

export default function () {
    extend(DiscussionControls, 'moderationControls', function(items, discussion) {
        if(discussion.canReset() && discussion.viewCount() > 0)
        {
            items.add(
                'reset',
                <Button icon='far fa-eye-slash' onclick={() => app.modal.show(ResetDiscussionViewsModal, { discussion })}>
                    {app.translator.trans('michaelbelgium-discussion-views.forum.discussion_controls.resetviews_button')}
                </Button>
            );
        }
    });
}
