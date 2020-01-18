import { extend } from 'flarum/extend';
import DiscussionList from 'flarum/components/DiscussionList';

export default function () {
    extend(DiscussionList.prototype, 'sortMap', function (map) {
        if(app.forum.attribute('mb-discussionviews.show_filter') == 1) {
            map.popular = '-view_count';
            map.unpopular = 'view_count';
        }
    });
}
