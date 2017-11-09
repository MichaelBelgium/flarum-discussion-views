'use strict';

System.register('michaelbelgium/flarum-discussion-views/main', ['flarum/app', 'flarum/extend', 'flarum/components/DiscussionListItem', 'flarum/Model', 'flarum/models/Discussion'], function (_export, _context) {
    "use strict";

    var app, extend, DiscussionListItem, Model, Discussion;
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
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
                Discussion.prototype.views = Model.attribute('views');

                extend(DiscussionListItem.prototype, 'infoItems', function (items) {
                    var discussion = this.props.discussion;
                    items.add('discussion-views', discussion.views());
                });
            });
        }
    };
});