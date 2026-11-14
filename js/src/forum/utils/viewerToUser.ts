import app from "flarum/forum/app";
import User from "flarum/common/models/User";

export interface UniqueViewer {
  id: string;
  username: string;
  displayName: string;
  slug: string;
  avatarUrl: string | null;
  avatarSrcset: string | null;
}

/**
 * Turns a plain viewer entry into a User model usable by Link, username() and Avatar.
 * Prefers a fully loaded user from the store; otherwise creates a lightweight, unsaved one
 * (not pushed into the store, so it never overwrites real user data).
 */
export default function viewerToUser(viewer: UniqueViewer): User {
  return (
    app.store.getById<User>("users", viewer.id) ??
    app.store.createRecord<User>("users", {
      id: viewer.id,
      attributes: {
        username: viewer.username,
        displayName: viewer.displayName,
        slug: viewer.slug,
        avatarUrl: viewer.avatarUrl,
        avatarSrcset: viewer.avatarSrcset,
      },
    })
  );
}
