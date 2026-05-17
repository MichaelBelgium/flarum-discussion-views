import FormModal, { IFormModalAttrs } from "flarum/common/components/FormModal";
import Button from "flarum/common/components/Button";
import Mithril from "mithril";
import app from "flarum/forum/app";
import Discussion from "flarum/common/models/Discussion";

export interface IResetDiscussionViewsModalAttrs extends IFormModalAttrs {
  discussion: Discussion;
}

export default class ResetDiscussionViewsModal extends FormModal<IResetDiscussionViewsModalAttrs> {
  content(): Mithril.Children {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <p>
            {app.translator.trans(
              "michaelbelgium-discussion-views.forum.modal_resetviews.label",
              { count: this.attrs.discussion.viewCount() },
            )}
          </p>
          <div className="Form-group">
            {Button.component(
              {
                className: "Button Button--primary Button--block",
                type: "submit",
                loading: this.loading,
              },
              app.translator.trans("michaelbelgium-discussion-views.forum.modal_resetviews.submit_button"),
            )}
          </div>
        </div>
      </div>
    );
  }

  title(): Mithril.Children {
    return app.translator.trans("michaelbelgium-discussion-views.forum.modal_resetviews.title");
  }

  className(): string {
    return "Modal--small";
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();
    this.loading = true;

    this.attrs.discussion
      .save({ resetViews: true })
      .then(() => this.hide())
      .catch(() => this.loaded());
  }
}
