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

System.register('michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay', ['flarum/extend', 'flarum/Model', 'flarum/models/Discussion', 'flarum/components/DiscussionListItem'], function (_export, _context) {
    "use strict";

    var extend, Model, Discussion, DiscussionListItem;

    _export('default', function () {
        Discussion.prototype.views = Model.attribute('views');

        extend(DiscussionListItem.prototype, 'infoItems', function (items) {
            var discussion = this.props.discussion;
            items.add('discussion-views', discussion.views());
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flarumComponentsDiscussionListItem) {
            DiscussionListItem = _flarumComponentsDiscussionListItem.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('michaelbelgium/flarum-discussion-views/main', ['flarum/app', 'flarum/extend', 'michaelbelgium/flarum-discussion-views/components/AddPopularSort', 'michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay'], function (_export, _context) {
    "use strict";

    var app, extend, AddPopularSort, AddViewsToModelAndDisplay;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsAddPopularSort) {
            AddPopularSort = _michaelbelgiumFlarumDiscussionViewsComponentsAddPopularSort.default;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsAddViewsToModelAndDisplay) {
            AddViewsToModelAndDisplay = _michaelbelgiumFlarumDiscussionViewsComponentsAddViewsToModelAndDisplay.default;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
                AddPopularSort();
                AddViewsToModelAndDisplay();
            });
        }
    };
});