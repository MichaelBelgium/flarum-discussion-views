import app from 'flarum/app';
import { extend } from 'flarum/extend';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';

app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
    Discussion.prototype.views = Model.attribute('views');

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const discussion = this.props.discussion;
        items.add('discussion-views', discussion.views());
    });
});