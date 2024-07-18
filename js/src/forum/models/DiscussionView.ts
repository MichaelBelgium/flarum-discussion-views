import Model from "flarum/common/Model";
import User from "flarum/common/models/User";
import Discussion from "flarum/common/models/Discussion";

export default class DiscussionView extends Model {
  //comes from DiscussionViewSerializer (user(), discussion(), visited_at)
  visitedAt = Model.attribute("visited_at", Model.transformDate);
  user = Model.hasOne<User>("user");
  discussion = Model.hasOne<Discussion>("discussion");
}
