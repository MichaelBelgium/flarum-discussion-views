import Model from 'flarum/Model';

export default class DiscussionView extends Model {
  //comes from DiscussionViewSerializer (user(), discussion(), visited_at)
  visitedAt = Model.attribute('visited_at', Model.transformDate);
  user = Model.hasOne('user');
  discussion = Model.hasOne('discussion');
}