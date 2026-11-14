import Extend from "flarum/common/extenders";
import Discussion from "flarum/common/models/Discussion";
import DiscussionView from "./models/DiscussionView";
import type { UniqueViewer } from "./utils/viewerToUser";

export default [
  new Extend.Store().add("discussionview", DiscussionView),

  new Extend.Model(Discussion)
    .attribute<boolean>("canReset")
    .attribute<number>("viewCount")
    .attribute<boolean>("canViewNumber")
    .attribute<boolean>("canViewList")
    .attribute<UniqueViewer[] | undefined>("uniqueViewers")
    .hasMany<DiscussionView>("latestViews"),
];
