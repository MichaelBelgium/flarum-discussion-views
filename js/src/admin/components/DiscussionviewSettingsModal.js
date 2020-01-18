import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

export default class DiscussionviewSettingsModal extends SettingsModal {
    className() {
        return 'Modal--small';
    }

    title() {
        return app.translator.trans('flarum_discussion_views.admin.settings.title');
    }

    form() {
        return [
            <div className="Form-group">
                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.track_unique')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.track_unique'),
                    children: app.translator.trans('flarum_discussion_views.admin.settings.track_unique')
                })}
                
                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.abbr_numbers')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.abbr_numbers'),
                    children: app.translator.trans('flarum_discussion_views.admin.settings.abbr_numbers')
                })}
                
                {Switch.component({
                    state: this.setting('michaelbelgium-discussionviews.show_filter')() == 1,
                    onchange: this.setting('michaelbelgium-discussionviews.show_filter'),
                    children: app.translator.trans('flarum_discussion_views.admin.settings.show_filter')
                })}
            </div>
        ];
    }
}