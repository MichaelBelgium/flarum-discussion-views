import { extend } from 'flarum/extend';
import Button from 'flarum/components/Button';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import ResetDiscussionViewsModal from './ResetDiscussionViewsModal';

export default function () {
    extend(DiscussionControls, 'moderationControls', function(items, discussion) {
        if(discussion.attribute('canReset') && discussion.viewCount() > 0)
        {
            items.add('reset', Button.component({
                children: app.translator.trans('michaelbelgium-discussion-views.forum.discussion_controls.resetviews_button'),
                icon: 'far fa-eye-slash',
                onclick: this.resetViewsAction.bind(discussion)
            }));
        }
    });

    DiscussionControls.resetViewsAction = function() {
        return app.modal.show(new ResetDiscussionViewsModal({
            discussion: this
        }));
    };
}
