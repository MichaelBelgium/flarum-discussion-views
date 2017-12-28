'use strict';

System.register('michaelbelgium/flarum-discussion-views/main', ['flarum/extend', 'flarum/app', 'flarum/components/PermissionGrid'], function (_export, _context) {
	"use strict";

	var extend, app, PermissionGrid;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_flarumApp) {
			app = _flarumApp.default;
		}, function (_flarumComponentsPermissionGrid) {
			PermissionGrid = _flarumComponentsPermissionGrid.default;
		}],
		execute: function () {

			app.initializers.add('michaelbelgium-admin-discussion-views', function () {
				extend(PermissionGrid.prototype, 'moderateItems', function (items) {
					items.add('resetViews', {
						icon: 'eye',
						label: app.translator.trans('flarum_discussion_views.admin.permissions.reset_views_label'),
						permission: 'discussion.resetViews'
					});
				});
			});
		}
	};
});