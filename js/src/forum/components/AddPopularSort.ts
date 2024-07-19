import { extend } from "flarum/common/extend";
import DiscussionListState from "flarum/forum/states/DiscussionListState";
import app from "flarum/forum/app";

export default function () {
  extend(DiscussionListState.prototype, "sortMap", function (map) {
    if (app.forum.attribute("toggleFilter") == 1) {
      map.popular = "-view_count";
      map.unpopular = "view_count";
    }
  });
}
