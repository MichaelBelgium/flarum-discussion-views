import Modal, { IInternalModalAttrs } from "flarum/common/components/Modal";
import Link from "flarum/common/components/Link";
import Button from "flarum/common/components/Button";
import username from "flarum/common/helpers/username";
import Avatar from "flarum/common/components/Avatar";
import app from "flarum/forum/app";
import Mithril from "mithril";
import Post from "flarum/common/models/Post";
import viewerToUser from "../utils/viewerToUser";

export interface IPostDiscussionViewsModalAttrs extends IInternalModalAttrs {
  post: Post;
}

// Rendering tens of thousands of list items at once freezes the browser, so render in pages.
const PAGE_SIZE = 100;

export default class PostDiscussionViewsModal extends Modal<IPostDiscussionViewsModalAttrs> {
  shown: number = PAGE_SIZE;

  className(): string {
    return "Modal--small";
  }

  title(): Mithril.Children {
    return app.translator.trans("michaelbelgium-discussion-views.forum.post.modal_title_text");
  }

  content(): Mithril.Children {
    const viewers = this.attrs.post.discussion().uniqueViewers() ?? [];

    const names = viewers.slice(0, this.shown).map((viewer) => {
      const user = viewerToUser(viewer);

      return (
        <li key={viewer.id}>
          <Link href={app.route.user(user)}>
            <Avatar user={user} />
            {username(user)}
          </Link>
        </li>
      );
    });

    return (
      <div className="Modal-body">
        <ul className="PostLikesModal-list">{names}</ul>
        {this.shown < viewers.length && (
          <Button className="Button Button--block" onclick={() => (this.shown += PAGE_SIZE)}>
            {app.translator.trans("core.forum.discussion_list.load_more_button")}
          </Button>
        )}
      </div>
    );
  }
}
