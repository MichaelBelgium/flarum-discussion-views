import { extend } from "flarum/common/extend";
import DiscussionListItem from "flarum/forum/components/DiscussionListItem";
import DiscussionList from "flarum/forum/components/DiscussionList";
import abbreviateNumber from "flarum/common/utils/abbreviateNumber";
import app from "flarum/forum/app";
import icon from "flarum/common/helpers/icon";

export default function () {
  extend(DiscussionListItem.prototype, "infoItems", function (items) {
    if (this.attrs.discussion.canViewNumber()) {
      const views = this.attrs.discussion.viewCount();

      const number =
        app.forum.attribute("abbrNumber") == 1
          ? abbreviateNumber(views)
          : views;

      items.add("discussion-views", m("span", [icon("far fa-eye"), number]));
    }
  });

  extend(DiscussionList.prototype, "requestParams", function (params) {
    params.include.push("latestViews"); //fixes not loading relationship when navigating back to the discussion list if you directly went to a discussion or another page
  });
}
