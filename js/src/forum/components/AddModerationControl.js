import { extend } from 'flarum/extend';
import Button from 'flarum/components/Button';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import ResetDiscussionViewsModal from './ResetDiscussionViewsModal';

export default function () {
    extend(DiscussionControls, 'moderationControls', function(items, discussion) {
        if(discussion.canReset())
        {
            items.add('reset', Button.component({
                children: app.translator.trans('flarum_discussion_views.forum.discussion_controls.resetviews_button'),
                icon: 'far fa-eye',
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
