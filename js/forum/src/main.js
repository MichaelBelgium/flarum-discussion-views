import app from 'flarum/app';
import { extend } from 'flarum/extend';
import AddPopularSort from 'michaelbelgium/flarum-discussion-views/components/AddPopularSort';
import AddViewsToModelAndDisplay from 'michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay';
import ResetDiscussionViewsModal from 'michaelbelgium/flarum-discussion-views/components/ResetDiscussionViewsModal';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Button from 'flarum/components/Button';

app.initializers.add('michaelbelgium-discussion-views', function () {
    AddPopularSort();
    AddViewsToModelAndDisplay();

    extend(DiscussionControls, 'moderationControls', function(items, discussion) {
        if(discussion.canReset())
        {
            items.add('reset', Button.component({
                children: app.translator.trans('flarum_discussion_views.forum.discussion_controls.resetviews_button'),
                icon: 'eye',
                onclick: this.resetViewsAction.bind(discussion)
            }));    
        }
    });

    DiscussionControls.resetViewsAction = function() {
        return app.modal.show(new ResetDiscussionViewsModal({
            discussion: this
        }));
    };
});