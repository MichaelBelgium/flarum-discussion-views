import { extend } from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';
import DiscussionviewSettingsModal from './components/DiscussionviewSettingsModal';

app.initializers.add('michaelbelgium-admin-discussion-views', () => {
	extend(PermissionGrid.prototype, 'moderateItems', items => {
		items.add('resetViews', {
			icon: 'far fa-eye',
			label: app.translator.trans('michaelbelgium-discussion-views.admin.permissions.reset_views_label'),
			permission: 'discussion.resetViews'
		});
	});

	extend(PermissionGrid.prototype, 'viewItems', items => {
		items.add('viewDiscussionNumber', {
			icon: 'far fa-eye',
			label: app.translator.trans('michaelbelgium-discussion-views.admin.permissions.view_number_label'),
			permission: 'discussion.readViewnumber',
			allowGuest: true
		});
	});

	app.extensionSettings['michaelbelgium-discussion-views'] = () => app.modal.show(new DiscussionviewSettingsModal());
});
