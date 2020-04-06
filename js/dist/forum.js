module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(o,s,function(e){return t[e]}.bind(null,s));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=20)}([function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat.Model},function(t,e){t.exports=flarum.core.compat.app},function(t,e,n){"use strict";function o(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}n.d(e,"a",(function(){return o}))},,function(t,e){t.exports=flarum.core.compat["components/DiscussionList"]},function(t,e){t.exports=flarum.core.compat["components/Button"]},function(t,e){t.exports=flarum.core.compat["models/Discussion"]},function(t,e){t.exports=flarum.core.compat["utils/DiscussionControls"]},,function(t,e){t.exports=flarum.core.compat["components/DiscussionListItem"]},function(t,e){t.exports=flarum.core.compat["components/DiscussionPage"]},function(t,e){t.exports=flarum.core.compat["components/FieldSet"]},function(t,e){t.exports=flarum.core.compat["utils/abbreviateNumber"]},function(t,e){t.exports=flarum.core.compat["helpers/avatar"]},function(t,e){t.exports=flarum.core.compat["utils/ItemList"]},function(t,e){t.exports=flarum.core.compat["utils/string"]},function(t,e){t.exports=flarum.core.compat["utils/humanTime"]},function(t,e){t.exports=flarum.core.compat["components/Modal"]},,function(t,e,n){"use strict";n.r(e);var o=n(2),s=n.n(o),r=n(0),i=n(5),a=n.n(i),u=n(1),c=n.n(u),l=n(7),p=n.n(l),f=n(10),d=n.n(f),b=n(11),v=n.n(b),h=n(12),w=n.n(h),y=n(13),_=n.n(y);function x(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var O=n(3);function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var j=function(t){function e(){for(var e,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return g(x(e=t.call.apply(t,[this].concat(o))||this),"visitedAt",c.a.attribute("visited_at",c.a.transformDate)),g(x(e),"user",c.a.hasOne("user")),g(x(e),"discussion",c.a.hasOne("discussion")),e}return Object(O.a)(e,t),e}(c.a),C=n(14),M=n.n(C),N=n(15),V=n.n(N),D=n(16),P=n(17),A=n.n(P),S=n(6),L=n.n(S),U=n(8),B=n.n(U),F=n(18),I=function(t){function e(){return t.apply(this,arguments)||this}Object(O.a)(e,t);var n=e.prototype;return n.init=function(){t.prototype.init.call(this),this.discussion=this.props.discussion,this.currentViewsCount=this.discussion.viewCount()},n.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("p",null,app.translator.transChoice("flarum_discussion_views.forum.modal_resetviews.label",this.currentViewsCount,{count:this.currentViewsCount})),m("div",{className:"Form-group"},L.a.component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading,children:app.translator.trans("flarum_discussion_views.forum.modal_resetviews.submit")}))))},n.title=function(){return app.translator.trans("flarum_discussion_views.forum.modal_resetviews.title")},n.className=function(){return"Modal--small"},n.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0,this.props.discussion.save({resetViews:!0}).then((function(){m.redraw()})).catch((function(t){e.loading=!1,console.log(t)})),this.hide()},e}(n.n(F).a);s.a.initializers.add("michaelbelgium-discussion-views",(function(){Object(r.extend)(a.a.prototype,"sortMap",(function(t){1==app.forum.attribute("mb-discussionviews.show_filter")&&(t.popular="-view_count",t.unpopular="view_count")})),app.store.models.discussionviews=j,p.a.prototype.views=c.a.hasMany("latestViews"),p.a.prototype.canReset=c.a.attribute("canReset"),p.a.prototype.viewCount=c.a.attribute("viewCount"),Object(r.extend)(d.a.prototype,"infoItems",(function(t){if(this.props.discussion.attribute("canViewNumber")){var e=this.props.discussion.viewCount(),n=1==app.forum.attribute("mb-discussionviews.abbr_numbers")?_()(e):e;t.add("discussion-views",n)}})),Object(r.extend)(a.a.prototype,"requestParams",(function(t){t.include.push("latestViews")})),Object(r.extend)(v.a.prototype,"sidebarItems",(function(t){if(0!=app.forum.attribute("mb-discussionviews.show_viewlist")){var e=this.discussion.views(),n=new V.a;$.each(e,(function(t,e){var o=!1===e.user()?"Guest":Object(D.ucfirst)(e.user().username()),s=m("div",{className:"item-lastUser-content"},M()(!1===e.user()?null:e.user()),m("div",null,o,m("span",{className:"lastUser-visited",title:e.visitedAt().toLocaleString()},A()(e.visitedAt()))));!1!==e.user()&&(s=m("a",{href:app.forum.attribute("baseUrl")+"/u/"+o},s)),n.add("lastUser-"+t,s)})),t.add("lastDiscussionViewers",w.a.component({label:app.translator.trans("flarum_discussion_views.forum.viewlist.title"),className:"LastDiscussionUsers",children:n.toArray()}))}})),Object(r.extend)(B.a,"moderationControls",(function(t,e){e.attribute("canReset")&&e.viewCount()>0&&t.add("reset",L.a.component({children:app.translator.trans("flarum_discussion_views.forum.discussion_controls.resetviews_button"),icon:"far fa-eye-slash",onclick:this.resetViewsAction.bind(e)}))})),B.a.resetViewsAction=function(){return app.modal.show(new I({discussion:this}))}}))}]);
//# sourceMappingURL=forum.js.map