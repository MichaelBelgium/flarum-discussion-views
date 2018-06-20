import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';

export default function () {
    Discussion.prototype.views = Model.attribute('views');
    Discussion.prototype.canReset = Model.attribute('canReset');

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const discussion = this.props.discussion;
        items.add('discussion-views', abbreviateNumber(discussion.views()));
    });
}
