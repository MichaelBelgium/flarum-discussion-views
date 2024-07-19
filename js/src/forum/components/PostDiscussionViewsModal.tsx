import Modal, { IInternalModalAttrs } from "flarum/common/components/Modal";
import Link from "flarum/common/components/Link";
import username from "flarum/common/helpers/username";
import avatar from "flarum/common/helpers/avatar";
import app from "flarum/forum/app";
import Mithril from "mithril";
import Post from "flarum/common/models/Post";

export interface IPostDiscussionViewsModalAttrs extends IInternalModalAttrs {
  post: Post;
}
export default class PostDiscussionViewsModal<
  CustomAttrs extends
    IPostDiscussionViewsModalAttrs = IPostDiscussionViewsModalAttrs,
> extends Modal<CustomAttrs> {
  className(): string {
    return "Modal--small";
  }

  title(): Mithril.Children {
    return app.translator.trans(
      "michaelbelgium-discussion-views.forum.post.modal_title_text",
    );
  }

  content(): Mithril.Children {
    const views = this.attrs.post.discussion().uniqueViews();

    const names = views.map((view: any) => {
      const user = view.user();

      return (
        <li>
          <Link href={app.route.user(user)}>
            {avatar(user)} {username(user)}
          </Link>
        </li>
      );
    });

    return (
      <div className="Modal-body">
        <ul className="PostLikesModal-list">{names}</ul>
      </div>
    );
  }
}
