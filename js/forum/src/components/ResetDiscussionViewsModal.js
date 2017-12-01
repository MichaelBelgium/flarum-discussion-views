import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class ResetDiscussionViewsModal extends Modal {
    init() {
        this.discussion = this.props.discussion;
    }

    content() {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="Form-group">
                        Set to view count
                        <input className="FormControl" type="number" min="0" />
                    </div>
                    <div className="Form-group">
                        {Button.component({
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            children: app.translator.trans('flarum_discussion_views.forum.modal_resetviews.submit')
                        })}
                    </div>
                </div>
            </div>
        )
    }

    title() {
        return app.translator.trans('flarum_discussion_views.forum.modal_resetviews.title');
    }

    className() {
        return 'Modal--small';
    }

    onsubmit(e) {
        e.preventDefault();
        console.log('submitted');
        this.hide();
    }
}