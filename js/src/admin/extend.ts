import Extend from "flarum/common/extenders";
import app from "flarum/admin/app";

export default [
  new Extend.Admin()
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.track_unique",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.track_unique_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.track_unique_text",
      ),
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.ignore_crawlers",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.ignore_crawlers_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.ignore_crawlers_text",
      ),
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.track_guests",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.track_guests_label",
      ),
      type: "boolean",
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.abbr_numbers",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.abbr_numbers_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.abbr_numbers_text",
      ),
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.show_filter",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.show_filter_label",
      ),
      type: "boolean",
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.show_viewlist",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.show_viewlist_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.show_viewlist_text",
      ),
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.show_footer_viewlist",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.show_footer_viewlist_label",
      ),
      type: "boolean",
      help: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.show_footer_viewlist_text",
      ),
    }))
    .setting(() => ({
      setting: "michaelbelgium-discussionviews.max_listcount",
      label: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.max_viewcount_label",
      ),
      type: "number",
      help: app.translator.trans(
        "michaelbelgium-discussion-views.admin.settings.max_viewcount_text",
      ),
    }))
    .permission(
      () => ({
        icon: "far fa-eye",
        label: app.translator.trans(
          "michaelbelgium-discussion-views.admin.permissions.reset_views_label",
        ),
        permission: "discussion.resetViews",
      }),
      "moderate",
    )
    .permission(
      () => ({
        icon: "far fa-eye",
        label: app.translator.trans(
          "michaelbelgium-discussion-views.admin.permissions.view_number_label",
        ),
        permission: "discussion.readViewnumber",
        allowGuest: true,
      }),
      "view",
    ),
];
