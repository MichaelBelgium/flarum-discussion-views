'use strict';

System.register('michaelbelgium/flarum-discussion-views/components/AddPopularSort', ['flarum/extend', 'flarum/components/DiscussionList'], function (_export, _context) {
    "use strict";

    var extend, DiscussionList;

    _export('default', function () {
        extend(DiscussionList.prototype, 'sortMap', function (map) {
            map.popular = '-views';
            map.unpopular = 'views';
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsDiscussionList) {
            DiscussionList = _flarumComponentsDiscussionList.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay', ['flarum/extend', 'flarum/Model', 'flarum/models/Discussion', 'flarum/components/DiscussionListItem'], function (_export, _context) {
    "use strict";

    var extend, Model, Discussion, DiscussionListItem;

    _export('default', function () {
        Discussion.prototype.views = Model.attribute('views');
        Discussion.prototype.canReset = Model.attribute('canReset');

        extend(DiscussionListItem.prototype, 'infoItems', function (items) {
            var discussion = this.props.discussion;
            items.add('discussion-views', discussion.views());
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flarumComponentsDiscussionListItem) {
            DiscussionListItem = _flarumComponentsDiscussionListItem.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('michaelbelgium/flarum-discussion-views/components/ResetDiscussionViewsModal', ['flarum/components/Modal', 'flarum/components/Button'], function (_export, _context) {
    "use strict";

    var Modal, Button, ResetDiscussionViewsModal;
    return {
        setters: [function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }],
        execute: function () {
            ResetDiscussionViewsModal = function (_Modal) {
                babelHelpers.inherits(ResetDiscussionViewsModal, _Modal);

                function ResetDiscussionViewsModal() {
                    babelHelpers.classCallCheck(this, ResetDiscussionViewsModal);
                    return babelHelpers.possibleConstructorReturn(this, (ResetDiscussionViewsModal.__proto__ || Object.getPrototypeOf(ResetDiscussionViewsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(ResetDiscussionViewsModal, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(ResetDiscussionViewsModal.prototype.__proto__ || Object.getPrototypeOf(ResetDiscussionViewsModal.prototype), 'init', this).call(this);

                        this.discussion = this.props.discussion;
                        this.currentViewsCount = this.props.discussion.views();
                        this.newViewsCount = m.prop(this.currentViewsCount);
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form Form--centered' },
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('flarum_discussion_views.forum.modal_resetviews.label')
                                    ),
                                    m('input', { className: 'FormControl', type: 'number', min: '0', bidi: this.newViewsCount })
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    Button.component({
                                        className: 'Button Button--primary Button--block',
                                        type: 'submit',
                                        loading: this.loading,
                                        children: app.translator.trans('flarum_discussion_views.forum.modal_resetviews.submit')
                                    })
                                )
                            )
                        );
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flarum_discussion_views.forum.modal_resetviews.title');
                    }
                }, {
                    key: 'className',
                    value: function className() {
                        return 'Modal--small';
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this2 = this;

                        e.preventDefault();
                        this.loading = true;

                        var newViews = parseInt(this.newViewsCount());
                        var currentViews = this.currentViewsCount;

                        if (newViews >= 0 && newViews !== currentViews) {
                            this.props.discussion.save({ views: newViews }).then(function () {
                                m.redraw();
                            }).catch(function (reason) {
                                _this2.loading = false;
                                console.log(reason);
                            });
                        }

                        this.hide();
                    }
                }]);
                return ResetDiscussionViewsModal;
            }(Modal);

            _export('default', ResetDiscussionViewsModal);
        }
    };
});;
'use strict';

System.register('michaelbelgium/flarum-discussion-views/main', ['flarum/app', 'michaelbelgium/flarum-discussion-views/components/AddPopularSort', 'michaelbelgium/flarum-discussion-views/components/AddViewsToModelAndDisplay', 'michaelbelgium/flarum-discussion-views/components/AddModerationControl'], function (_export, _context) {
    "use strict";

    var app, AddPopularSort, AddViewsToModelAndDisplay, AddModerationControl;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsAddPopularSort) {
            AddPopularSort = _michaelbelgiumFlarumDiscussionViewsComponentsAddPopularSort.default;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsAddViewsToModelAndDisplay) {
            AddViewsToModelAndDisplay = _michaelbelgiumFlarumDiscussionViewsComponentsAddViewsToModelAndDisplay.default;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsAddModerationControl) {
            AddModerationControl = _michaelbelgiumFlarumDiscussionViewsComponentsAddModerationControl.default;
        }],
        execute: function () {

            app.initializers.add('michaelbelgium-discussion-views', function () {
                AddPopularSort();
                AddViewsToModelAndDisplay();
                AddModerationControl();
            });
        }
    };
});;
'use strict';

System.register('michaelbelgium/flarum-discussion-views/components/AddModerationControl', ['flarum/extend', 'flarum/components/Button', 'flarum/utils/DiscussionControls', 'michaelbelgium/flarum-discussion-views/components/ResetDiscussionViewsModal'], function (_export, _context) {
    "use strict";

    var extend, Button, DiscussionControls, ResetDiscussionViewsModal;

    _export('default', function () {
        extend(DiscussionControls, 'moderationControls', function (items, discussion) {
            if (discussion.canReset()) {
                items.add('reset', Button.component({
                    children: app.translator.trans('flarum_discussion_views.forum.discussion_controls.resetviews_button'),
                    icon: 'eye',
                    onclick: this.resetViewsAction.bind(discussion)
                }));
            }
        });

        DiscussionControls.resetViewsAction = function () {
            return app.modal.show(new ResetDiscussionViewsModal({
                discussion: this
            }));
        };
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumUtilsDiscussionControls) {
            DiscussionControls = _flarumUtilsDiscussionControls.default;
        }, function (_michaelbelgiumFlarumDiscussionViewsComponentsResetDiscussionViewsModal) {
            ResetDiscussionViewsModal = _michaelbelgiumFlarumDiscussionViewsComponentsResetDiscussionViewsModal.default;
        }],
        execute: function () {}
    };
});