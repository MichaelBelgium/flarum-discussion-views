import Model from "flarum/common/Model";
import User from "flarum/common/models/User";
import Discussion from "flarum/common/models/Discussion";

export default class DiscussionView extends Model {
  visitedAt() {
    return Model.attribute("visitedAt", Model.transformDate).call(this);
  }

  user() {
    return Model.hasOne<User>("user").call(this);
  }

  discussion() {
    return Model.hasOne<Discussion>("discussion").call(this);
  }
}
