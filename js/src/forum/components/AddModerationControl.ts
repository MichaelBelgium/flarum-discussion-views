import { extend } from "flarum/common/extend";
import Button from "flarum/common/components/Button";
import DiscussionControls from "flarum/forum/utils/DiscussionControls";
import ResetDiscussionViewsModal from "./ResetDiscussionViewsModal";
import app from "flarum/forum/app";
import Discussion from "flarum/common/models/Discussion";

export default function () {
  extend(DiscussionControls, "moderationControls", function (items, discussion: Discussion) {
    if (discussion.canReset() && discussion.viewCount() > 0) {
      items.add(
        "reset",
        Button.component({
            icon: "far fa-eye-slash",
            onclick: () => app.modal.show(ResetDiscussionViewsModal, { discussion }),
          },
          app.translator.trans("michaelbelgium-discussion-views.forum.discussion_controls.resetviews_button"),
        ),
      );
    }
  });
}
