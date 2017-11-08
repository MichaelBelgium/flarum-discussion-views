import app from 'flarum/app';
import { extend } from 'flarum/extend';
import DiscussionListItem from 'flarum/components/DiscussionListItem';

app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        const discussion = this.props.discussion;

        items.add('discussion-views',<span>6</span>);
    });
});