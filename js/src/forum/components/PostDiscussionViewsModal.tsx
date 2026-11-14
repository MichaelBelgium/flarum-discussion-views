import Modal, { IInternalModalAttrs } from "flarum/common/components/Modal";
import Link from "flarum/common/components/Link";
import Button from "flarum/common/components/Button";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";
import username from "flarum/common/helpers/username";
import Avatar from "flarum/common/components/Avatar";
import app from "flarum/forum/app";
import Mithril from "mithril";
import Post from "flarum/common/models/Post";
import viewerToUser, { UniqueViewer, UniqueViewers } from "../utils/viewerToUser";

export interface IPostDiscussionViewsModalAttrs extends IInternalModalAttrs {
  post: Post;
}

interface ViewersResponse {
  data: UniqueViewer[];
  meta: { total: number; nextOffset: number };
}

// A discussion can have hundreds of thousands of viewers, so they are fetched from the API page by page.
export default class PostDiscussionViewsModal extends Modal<IPostDiscussionViewsModalAttrs> {
  viewers = new Map<string, UniqueViewer>();
  offset: number = 0;
  total: number = 0;
  loading: boolean = false;

  oninit(vnode: Mithril.Vnode<IPostDiscussionViewsModalAttrs, this>) {
    super.oninit(vnode);

    const initial = this.attrs.post.discussion()?.uniqueViewers();

    if (initial) this.apply(initial);
    if (!initial || this.hasMore()) this.loadMore();
  }

  hasMore(): boolean {
    return this.offset < this.total;
  }

  apply({ viewers, total, nextOffset }: UniqueViewers) {
    for (const viewer of viewers) {
      if (!this.viewers.has(viewer.id)) this.viewers.set(viewer.id, viewer);
    }

    this.total = total;
    this.offset = nextOffset;
  }

  className(): string {
    return "Modal--small";
  }

  title(): Mithril.Children {
    return app.translator.trans("michaelbelgium-discussion-views.forum.post.modal_title_text");
  }

  content(): Mithril.Children {
    const names = [...this.viewers.values()].map((viewer) => {
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
        {this.loading ? (
          <LoadingIndicator />
        ) : (
          this.hasMore() && (
            <Button className="Button Button--block" onclick={() => this.loadMore()}>
              {app.translator.trans("core.forum.discussion_list.load_more_button")}
            </Button>
          )
        )}
      </div>
    );
  }

  loadMore() {
    const discussion = this.attrs.post.discussion();
    if (!discussion || this.loading) return;

    this.loading = true;

    app.request<ViewersResponse>({
      method: "GET",
      url: `${app.forum.attribute("apiUrl")}/discussions/${discussion.id()}/viewers`,
      params: { page: { offset: this.offset } },
    })
    .then((response) => this.apply({ viewers: response.data, ...response.meta }))
    // app.request already shows an alert; keep the button so the user can retry.
    .catch(() => {})
    .finally(() => {
      this.loading = false;
      m.redraw();
    });
  }
}
