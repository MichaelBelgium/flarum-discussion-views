import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class DiscussionviewSettingsModal extends SettingsModal {
    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('michaelbelgium-discussion-views.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.track_unique')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.track_unique'),
                    children: app.translator.trans('michaelbelgium-discussion-views.admin.settings.track_unique_label')
                })}
                
                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.abbr_numbers')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.abbr_numbers'),
                    children: app.translator.trans('michaelbelgium-discussion-views.admin.settings.abbr_numbers_label')
                })}
                
                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.show_filter')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.show_filter'),
                    children: app.translator.trans('michaelbelgium-discussion-views.admin.settings.show_filter_label')
                })}

                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.show_viewlist')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.show_viewlist'),
                    children: app.translator.trans('michaelbelgium-discussion-views.admin.settings.show_viewlist_label')
                })}
            </div>,

            m('.Form-group', [
                m('label', app.translator.trans('michaelbelgium-discussion-views.admin.settings.max_viewcount_label')),
                m('input[type=number].FormControl', {
                    bidi: this.setting('michaelbelgium-discussionviews.max_listcount'),
                    min: 1
                })
            ])
        ];
    }
}