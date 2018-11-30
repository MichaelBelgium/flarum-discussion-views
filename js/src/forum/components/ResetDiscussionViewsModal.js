import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';

export default class ResetDiscussionViewsModal extends Modal {
    init()
    {
        super.init();

        this.discussion = this.props.discussion;
        this.currentViewsCount = this.props.discussion.views();
        this.newViewsCount = m.prop(this.currentViewsCount);
    }

    content()
    {
        return (
            <div className="Modal-body">
                <div className="Form Form--centered">
                    <div className="Form-group">
                        <label>{app.translator.trans('flarum_discussion_views.forum.modal_resetviews.label')}</label>
                        <input className="FormControl" type="number" min="0" bidi={this.newViewsCount} />
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

    title()
    {
        return app.translator.trans('flarum_discussion_views.forum.modal_resetviews.title');
    }

    className()
    {
        return 'Modal--small';
    }

    onsubmit(e)
    {
        e.preventDefault();
        this.loading = true;

        const newViews = parseInt(this.newViewsCount());
        const currentViews = this.currentViewsCount;

        if (newViews >= 0 && newViews !== currentViews)
        {
            this.props.discussion
                .save({ views: newViews })
                .then(() => { m.redraw(); })
                .catch((reason) => {
                    this.loading = false;
                    console.log(reason)
                });
        }

        this.hide();
    }
}
