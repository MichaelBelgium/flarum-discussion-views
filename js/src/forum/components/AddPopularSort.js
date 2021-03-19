import { extend } from 'flarum/extend';
import DiscussionListState from 'flarum/states/DiscussionListState'

export default function () {
    extend(DiscussionListState.prototype, 'sortMap', function (map) {
        if(app.forum.attribute('toggleFilter') == 1) {
            map.popular = '-view_count';
            map.unpopular = 'view_count';
        }
    });
}
