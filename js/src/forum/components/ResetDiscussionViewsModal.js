import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class ResetDiscussionViewsModal extends Modal {
    init()
    {
        super.init();

        this.discussion = this.props.discussion;
        this.currentViewsCount = this.discussion.viewCount();
    }

    content()
    {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <p>{app.translator.transChoice('michaelbelgium-discussion-views.forum.modal_resetviews.label', this.currentViewsCount, {count: this.currentViewsCount })}</p>
                    <div className="Form-group">
                        {Button.component({
                            className: 'Button Button--primary Button--block',
                            type: 'submit',
                            loading: this.loading,
                            children: app.translator.trans('michaelbelgium-discussion-views.forum.modal_resetviews.submit_button')
                        })}
                    </div>
                </div>
            </div>
        )
    }

    title()
    {
        return app.translator.trans('michaelbelgium-discussion-views.forum.modal_resetviews.title');
    }

    className()
    {
        return 'Modal--small';
    }

    onsubmit(e)
    {
        e.preventDefault();
        this.loading = true;

        this.props.discussion
            .save({ resetViews: true })
            .then(() => { m.redraw(); })
            .catch((reason) => {
                this.loading = false;
                console.log(reason)
            });

        this.hide();
    }
}
