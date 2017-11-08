'use strict';

System.register('michaelbelgium/flarum-discussion-views/main', ['flarum/app', 'flarum/extend', 'flarum/components/DiscussionListItem'], function (_export, _context) {
    "use strict";

    var app, extend, DiscussionListItem;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsDiscussionListItem) {
            DiscussionListItem = _flarumComponentsDiscussionListItem.default;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-flarum-discussion-views', function () {
                alert('Hello, world!');
            });
        }
    };
});