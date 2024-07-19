import { extend } from "flarum/common/extend";
import app from "flarum/forum/app";
import username from "flarum/common/helpers/username";
import icon from "flarum/common/helpers/icon";
import punctuateSeries from "flarum/common/helpers/punctuateSeries";
import avatar from "flarum/common/helpers/avatar";
import ItemList from "flarum/common/utils/ItemList";
import humanTime from "flarum/common/utils/humanTime";
import CommentPost from "flarum/forum/components/CommentPost";
import Link from "flarum/common/components/Link";
import DiscussionPage from "flarum/forum/components/DiscussionPage";
import FieldSet from "flarum/common/components/FieldSet";
import PostDiscussionViewsModal from "./PostDiscussionViewsModal";
import User from "flarum/common/models/User";

export default function () {
  extend(DiscussionPage.prototype, "sidebarItems", function (items) {
    if (app.forum.attribute("showViewList") == 0) return;

    const views = this.discussion!.latestViews();
    const viewList = new ItemList();

    views.forEach((view, key) => {
      const userName =
        view.user() === false
          ? app.translator.trans(
              "michaelbelgium-discussion-views.forum.viewlist.guest",
            )
          : view.user().username();

      let listitem = m("div", { className: "item-lastUser-content" }, [
        avatar(<User>view.user()),
        m("div", [
          userName,
          m(
            "span",
            {
              className: "lastUser-visited",
              title: view.visitedAt()!.toLocaleString(),
            },
            humanTime(view.visitedAt()),
          ),
        ]),
      ]);

      if (view.user() !== false) {
        listitem = Link.component(
          {
            href: app.route.user(<User>view.user()),
          },
          listitem,
        );
      }

      viewList.add("lastUser-" + key, listitem);
    });

    items.add(
      "lastDiscussionViewers",
      FieldSet.component(
        {
          className: "LastDiscussionUsers",
          label: app.translator.trans(
            "michaelbelgium-discussion-views.forum.viewlist.title",
          ),
        },
        viewList.toArray(),
      ),
    );
  });

  extend(CommentPost.prototype, "footerItems", function (items) {
    if (app.forum.attribute("showFooterViewList") == 0) return;

    const post = this.attrs.post;
    const discussion = post.discussion();
    const views = discussion.uniqueViews();
    const firstPost = discussion.posts()[0];

    if (firstPost === undefined) return; //if first post isn't loaded

    if (firstPost.id() === post.id()) {
      if (views && views.length > 0) {
        const limit = 5;

        const names = views.map((view) =>
          Link.component(
            { href: app.route.user(<User>view.user()) },
            view.user() === app.session.user
              ? app.translator.trans(
                  "michaelbelgium-discussion-views.forum.post.you",
                )
              : username(view.user()),
          ),
        );

        if (views.length > limit) {
          const count = views.length - limit;

          names.push(
            Link.component(
              {
                href: "#",
                onclick: (e: Event) => {
                  e.preventDefault();
                  app.modal.show(PostDiscussionViewsModal, { post });
                },
              },
              app.translator.trans(
                "michaelbelgium-discussion-views.forum.post.others_link",
                { count },
              ),
            ),
          );
        }

        if (names.length > 0) {
          items.add(
            "viewed",
            m("div", { className: "Post-Discussion-viewedBy" }, [
              icon("fas fa-eye"),
              app.translator.trans(
                "michaelbelgium-discussion-views.forum.post.viewed_by",
                {
                  users: punctuateSeries(names),
                },
              ),
            ]),
          );
        }
      }
    }
  });
}
