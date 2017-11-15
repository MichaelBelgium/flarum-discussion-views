'use strict';

System.register('michaelbelgium/flarum-discussion-views/components/AddPopularSort', ['flarum/extend', 'flarum/components/DiscussionList'], function (_export, _context) {
    "use strict";

    var extend, DiscussionList;

    _export('default', function () {
        extend(DiscussionList.prototype, 'sortMap', function (map) {
            map.popular = '-views';
            map.unpopular = 'views';
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsDiscussionList) {
            DiscussionList = _flarumComponentsDiscussionList.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('michaelbelgium/flarum-discussion-views/main', ['flarum/app', 'flarum/extend', 'flarum/components/DiscussionListItem', 'flarum/Model', 'flarum/models/Discussion', 'michaelbelgium/flarum-discussion-views/components/AddPopularSort'], function (_export, _context) {
    "use strict";

    var app, extend, DiscussionListItem, Model, Discussion, AddPopularSort;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsDiscussionListItem) {
            DiscussionListItem = _flarumComponentsDiscussionListItem.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsAddPopularSort) {
            AddPopularSort = _michaelbelgiumFlarumDiscussionViewsComponentsAddPopularSort.default;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
                Discussion.prototype.views = Model.attribute('views');

                extend(DiscussionListItem.prototype, 'infoItems', function (items) {
                    var discussion = this.props.discussion;
                    items.add('discussion-views', discussion.views());
                });

                AddPopularSort();
            });
        }
    };
});