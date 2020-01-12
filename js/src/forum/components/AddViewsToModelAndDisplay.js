import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';
import DiscussionView from '../models/DiscussionView';

export default function () {
    app.store.models.discussionviews = DiscussionView; //discussionviews = serializer type

    Discussion.prototype.views = Model.hasMany('views');
    Discussion.prototype.canReset = Model.attribute('canReset');

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const discussion = this.props.discussion;
        items.add('discussion-views', abbreviateNumber(discussion.views().length));
    });
}
