import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionList from 'flarum/components/DiscussionList';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';
import DiscussionView from '../models/DiscussionView';
import app from 'flarum/app';

export default function () {
    app.store.models.discussionviews = DiscussionView; //discussionviews = serializer type

    Discussion.prototype.views = Model.hasMany('latestViews');
    Discussion.prototype.uniqueViews = Model.hasMany('uniqueViews');
    Discussion.prototype.canReset = Model.attribute('canReset');
    Discussion.prototype.canViewNumber = Model.attribute('canViewNumber');
    Discussion.prototype.viewCount = Model.attribute('viewCount');

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        if(this.attrs.discussion.canViewNumber()) {
            const views = this.attrs.discussion.viewCount();

            var number = app.forum.attribute('abbrNumber') == 1 ? abbreviateNumber(views) : views;
            items.add('discussion-views', <span>{number}</span>);   
        }
    });

    extend(DiscussionList.prototype, 'requestParams', function(params) {
        params.include.push('latestViews'); //fixes not loading relationship when navigating back to the discussion list if you directly went to a discussion or another page
    })
}
