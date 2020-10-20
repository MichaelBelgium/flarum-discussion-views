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
                <Switch 
                    state={this.setting('michaelbelgium-discussionviews.track_unique')()} 
                    onchange={this.setting('michaelbelgium-discussionviews.track_unique')}
                >
                    {app.translator.trans('michaelbelgium-discussion-views.admin.settings.track_unique_label')}
                </Switch>
                
                <Switch 
                    state={this.setting('michaelbelgium-discussionviews.abbr_numbers')()} 
                    onchange={this.setting('michaelbelgium-discussionviews.abbr_numbers')}
                >
                    {app.translator.trans('michaelbelgium-discussion-views.admin.settings.abbr_numbers_label')}
                </Switch>
                
                <Switch 
                    state={this.setting('michaelbelgium-discussionviews.show_filter')()} 
                    onchange={this.setting('michaelbelgium-discussionviews.show_filter')}
                >
                    {app.translator.trans('michaelbelgium-discussion-views.admin.settings.show_filter_label')}
                </Switch>

                <Switch 
                    state={this.setting('michaelbelgium-discussionviews.show_viewlist')()} 
                    onchange={this.setting('michaelbelgium-discussionviews.show_viewlist')}
                >
                    {app.translator.trans('michaelbelgium-discussion-views.admin.settings.show_viewlist_label')}
                </Switch>
            </div>,

            <div className="Form-group">
                <label>{app.translator.trans('michaelbelgium-discussion-views.admin.settings.max_viewcount_label')}</label>
                <input type="number" className="FormControl" bidi={this.setting('michaelbelgium-discussionviews.max_listcount')}></input>
            </div>
        ];
    }
}