import Discussion from "flarum/common/models/Discussion";
import DiscussionView from "../forum/models/DiscussionView";

declare module "flarum/common/models/Discussion" {
  export default interface Discussion {
    canReset(): boolean;
    viewCount(): number;
    canViewNumber(): boolean;
    latestViews(): DiscussionView[];
    uniqueViews(): DiscussionView[];
  }
}
