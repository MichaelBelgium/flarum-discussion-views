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

export default function () {
  extend(DiscussionPage.prototype, "sidebarItems", function (items) {
    if (app.forum.attribute("showViewList") == 0) return;

    const views = this.discussion!.latestViews();
    const viewList = new ItemList();

    views.forEach((view, key) => {
      const userName = view.user() === false ?
          app.translator.trans("michaelbelgium-discussion-views.forum.viewlist.guest") :
          username(view.user());

      let listitem = (
        <div className="item-lastUser-content">
          <Avatar user={view.user()} />
          <div>
            {userName}
            <span className="lastUser-visited" title={view.visitedAt()!.toLocaleString()}>
              {humanTime(view.visitedAt())}
            </span>
          </div>
        </div>
      );

      if (view.user() !== false) {
        listitem = Link.component(
          { href: app.route.user(view.user()) },
          listitem,
        );
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
    const firstPost = discussion.firstPost();

    if (!firstPost) return; //if first post isn't loaded

    const limit = app.forum.attribute('maxListCount') as number ?? 5;
    const views = discussion.uniqueViews();

    if (firstPost.id() == post.id() && views.length > 0) {
      const names = views.map((view) =>
        Link.component(
          { href: app.route.user(view.user()) },
          view.user() === app.session.user
            ? app.translator.trans("michaelbelgium-discussion-views.forum.post.you")
            : username(view.user()),
        ),
      ).splice(0, limit);

      if (views.length > limit) {
        names.push(Link.component(
          {
            href: "#",
            onclick: (e: Event) => {
              e.preventDefault();
              app.modal.show(PostDiscussionViewsModal, { post });
            }
          },
          app.translator.trans("michaelbelgium-discussion-views.forum.post.others_link", { count: views.length - limit }),
        ));
      }

      if (names.length > 0) {
        items.add(
          "viewed",
          <div className="Post-Discussion-viewedBy">
            <Icon name="fas fa-eye" />
            {app.translator.trans("michaelbelgium-discussion-views.forum.post.viewed_by", { users: punctuateSeries(names) })}
          </div>,
        );
      }
    }
  });
}
