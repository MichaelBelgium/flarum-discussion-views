import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('michaelbelgium-admin-discussion-views', () => {
	extend(PermissionGrid.prototype, 'moderateItems', items => {
		items.add('resetViews', {
			icon: 'far fa-eye',
			label: app.translator.trans('flarum_discussion_views.admin.permissions.reset_views_label'),
			permission: 'discussion.resetViews'
		});
	});
});
