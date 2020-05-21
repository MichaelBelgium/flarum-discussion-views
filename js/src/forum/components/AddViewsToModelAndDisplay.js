import { extend } from 'flarum/extend';
import Model from 'flarum/Model';
import Discussion from 'flarum/models/Discussion';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionList from 'flarum/components/DiscussionList';
import DiscussionPage from 'flarum/components/DiscussionPage';
import FieldSet from 'flarum/components/FieldSet';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';
import DiscussionView from '../models/DiscussionView';
import avatar from 'flarum/helpers/avatar';
import ItemList from 'flarum/utils/ItemList';
import {ucfirst} from 'flarum/utils/string';
import humanTime from 'flarum/utils/humanTime';

export default function () {
    app.store.models.discussionviews = DiscussionView; //discussionviews = serializer type

    Discussion.prototype.views = Model.hasMany('latestViews');
    Discussion.prototype.canReset = Model.attribute('canReset');
    Discussion.prototype.viewCount = Model.attribute('viewCount');

    extend(DiscussionListItem.prototype, 'infoItems', function(items) {
        if(this.props.discussion.attribute('canViewNumber')) {
            const views = this.props.discussion.viewCount();

            var number = app.forum.attribute('mb-discussionviews.abbr_numbers') == 1 ? abbreviateNumber(views) : views;
            items.add('discussion-views', number);   
        }
    });

    extend(DiscussionList.prototype, 'requestParams', function(params) {
        params.include.push('latestViews'); //fixes not loading relationship when navigating back to the discussion list if you directly went to a discussion or another page
    })
    
    extend(DiscussionPage.prototype, 'sidebarItems', function(items) {
        if(app.forum.attribute('mb-discussionviews.show_viewlist') == 0) return;
        
        const views = this.discussion.views();
        const viewList = new ItemList();

        $.each(views, function(key, view) {
            var userName = view.user() === false ? 'Guest' : ucfirst(view.user().username());

            var listitem = 
                <div className="item-lastUser-content">
                    {avatar(view.user() === false ? null : view.user())}
                    <div>
                        {userName}
                        <span className="lastUser-visited" title={view.visitedAt().toLocaleString()}>{humanTime(view.visitedAt())}</span>
                    </div>
                </div>;

            if(view.user() !== false) {
                listitem = <a href={app.forum.attribute('baseUrl') + '/u/' + userName}>{listitem}</a>;
            }

            viewList.add('lastUser-' + key, listitem);
        });

        items.add('lastDiscussionViewers', FieldSet.component({
            label: app.translator.trans('michaelbelgium-discussion-views.forum.viewlist.title'),
            className: 'LastDiscussionUsers',
            children: viewList.toArray()
        }));
    });
}
