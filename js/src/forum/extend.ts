import Extend from "flarum/common/extenders";
import Discussion from "flarum/common/models/Discussion";
import DiscussionView from "./models/DiscussionView";

export default [
  new Extend.Store().add("discussionviews", DiscussionView),

  new Extend.Model(Discussion)
    .attribute<boolean>("canReset")
    .attribute<number>("viewCount")
    .attribute<boolean>("canViewNumber")
    .hasMany<DiscussionView>("latestViews")
    .hasMany<DiscussionView>("uniqueViews"),
];
