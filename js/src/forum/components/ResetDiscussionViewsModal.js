import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class ResetDiscussionViewsModal extends Modal {
    oninit(vnode)
    {
        super.oninit(vnode);

        this.discussion = this.attrs.discussion;
        this.currentViewsCount = this.discussion.viewCount();
    }

    content()
    {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <p>{app.translator.trans('michaelbelgium-discussion-views.forum.modal_resetviews.label', {count: this.currentViewsCount })}</p>
                    <div className="Form-group">
                        {Button.component(
                            {
                                className: 'Button Button--primary Button--block',
                                type: 'submit',
                                loading: this.loading
                            }, 
                            app.translator.trans('michaelbelgium-discussion-views.forum.modal_resetviews.submit_button')
                        )}
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

        this.attrs.discussion
            .save({ resetViews: true })
            .catch(() => {
                this.loaded();
            });

        this.hide();
    }
}
