import { extend } from "flarum/common/extend";
import app from "flarum/forum/app";
import username from "flarum/common/helpers/username";
import Icon from "flarum/common/components/Icon";
import punctuateSeries from "flarum/common/helpers/punctuateSeries";
import Avatar from "flarum/common/components/Avatar";
import ItemList from "flarum/common/utils/ItemList";
import humanTime from "flarum/common/utils/humanTime";
import CommentPost from "flarum/forum/components/CommentPost";
import Link from "flarum/common/components/Link";
import DiscussionPage from "flarum/forum/components/DiscussionPage";
import FieldSet from "flarum/common/components/FieldSet";
import PostDiscussionViewsModal from "./PostDiscussionViewsModal";
import viewerToUser from "../utils/viewerToUser";

export default function () {
  extend(DiscussionPage.prototype, "sidebarItems", function (items) {
    if (app.forum.attribute("showViewList") == 0 || !this.discussion!.canViewList()) return;

    const views = this.discussion!.latestViews();
    const viewList = new ItemList();

    views.forEach((view, key) => {
      const user = view.user() || null;
      const userName = user ? username(user) : app.translator.trans("michaelbelgium-discussion-views.forum.viewlist.guest");

      let listitem = (
        <div className="item-lastUser-content">
          <Avatar user={user} />
          <div>
            {userName}
            <span className="lastUser-visited" title={view.visitedAt()!.toLocaleString()}>
              {humanTime(view.visitedAt())}
            </span>
          </div>
        </div>
      );

      if (user) {
        listitem = Link.component({ href: app.route.user(user) }, listitem);
      }

      viewList.add("lastUser-" + key, listitem);
    });

    items.add(
      "lastDiscussionViewers",
      FieldSet.component({
          className: "LastDiscussionUsers",
          label: app.translator.trans("michaelbelgium-discussion-views.forum.viewlist.title"),
        },
        viewList.toArray(),
      ),
    );
  });

  extend(CommentPost.prototype, "footerItems", function (items) {
    if (app.forum.attribute("showFooterViewList") == 0) return;

    const post = this.attrs.post;
    const discussion = post.discussion();

    if (!discussion.canViewList()) return;

    const firstPost = discussion.firstPost();

    if (!firstPost) return; //if first post isn't loaded

    // The API only sends the first few viewers plus the total; the modal loads the rest.
    const { total, viewers: views } = discussion.uniqueViewers() ?? { total: 0, viewers: [] };

    if (firstPost.id() == post.id() && views.length > 0) {
      const names = views.map((viewer) => {
        const user = viewerToUser(viewer);

        return Link.component(
          { href: app.route.user(user) },
          viewer.id === app.session.user?.id()
            ? app.translator.trans("michaelbelgium-discussion-views.forum.post.you")
            : username(user),
        );
      });

      if (total > views.length) {
        names.push(Link.component(
          {
            href: "#",
            onclick: (e: Event) => {
              e.preventDefault();
              app.modal.show(PostDiscussionViewsModal, { post });
            }
          },
          app.translator.trans("michaelbelgium-discussion-views.forum.post.others_link", { count: total - views.length }),
        ));
      }

      items.add(
        "viewed",
        <div className="Post-Discussion-viewedBy">
          <Icon name="fas fa-eye" />
          {app.translator.trans("michaelbelgium-discussion-views.forum.post.viewed_by", { users: punctuateSeries(names) })}
        </div>,
      );
    }
  });
}
