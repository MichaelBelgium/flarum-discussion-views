import Modal from 'flarum/common/components/Modal';
import Link from 'flarum/components/Link';
import username from 'flarum/helpers/username';
import avatar from 'flarum/helpers/avatar';

export default class PostDiscussionViewsModal extends Modal {
  className() {
    return 'Modal--small';
  }

  title() {
    return app.translator.trans('michaelbelgium-discussion-views.forum.post.modal_title_text');
  }

  content() {
    const views = this.attrs.post.discussion().uniqueViews();

    const names = views.map(view => {
      const user = view.user();

      return (<li>
          <Link href={app.route.user(user)}>
              {avatar(user)} {' '}
              {username(user)}
          </Link>
      </li>)
    });

    return (
        <div className="Modal-body">
            <ul className="PostLikesModal-list">
                {names}
            </ul>
        </div>
    );
  }
}
