import { extend } from "flarum/common/extend";
import DiscussionListItem from "flarum/forum/components/DiscussionListItem";
import abbreviateNumber from "flarum/common/utils/abbreviateNumber";
import app from "flarum/forum/app";
import Icon from "flarum/common/components/Icon";

export default function () {
  extend(DiscussionListItem.prototype, "statsItems", function (items) {
    if (this.attrs.discussion.canViewNumber()) {
      const views = this.attrs.discussion.viewCount();
      const number = app.forum.attribute("abbrNumber") == 1 ? abbreviateNumber(views) : views;

      items.add(
        "discussion-views",
        <span class="DiscussionListItem-stats-item DiscussionListItem-count DiscussionListItem-views">
          <span class="DiscussionListItem-stats-item-icon">
            <Icon name="far fa-eye" />
          </span>
          <span class="DiscussionListItem-stats-item-label">{number}</span>
        </span>,
      );
    }
  });
}
