import Discussion from "flarum/common/models/Discussion";
import DiscussionView from "../forum/models/DiscussionView";
import type { UniqueViewer } from "../forum/utils/viewerToUser";

declare module "flarum/common/models/Discussion" {
  export default interface Discussion {
    canReset(): boolean;
    viewCount(): number;
    canViewNumber(): boolean;
    canViewList(): boolean;
    latestViews(): DiscussionView[];
    uniqueViewers(): UniqueViewer[] | undefined;
  }
}
