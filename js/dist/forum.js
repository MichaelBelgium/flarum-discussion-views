(()=>{var t={n:o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return t.d(e,{a:e}),e},d:(o,e)=>{for(var s in e)t.o(e,s)&&!t.o(o,s)&&Object.defineProperty(o,s,{enumerable:!0,get:e[s]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";t.r(o),t.d(o,{extend:()=>Y});const e=flarum.core.compat["forum/app"];var s=t.n(e);const n=flarum.core.compat["common/extend"],r=flarum.core.compat["forum/states/DiscussionListState"];var i=t.n(r);const a=flarum.core.compat["forum/components/DiscussionListItem"];var u=t.n(a);const c=flarum.core.compat["forum/components/DiscussionList"];var l=t.n(c);const d=flarum.core.compat["common/utils/abbreviateNumber"];var p=t.n(d);const f=flarum.core.compat["common/components/Button"];var v=t.n(f);const h=flarum.core.compat["forum/utils/DiscussionControls"];var b=t.n(h);function w(t,o){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},w(t,o)}function y(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,w(t,o)}const g=flarum.core.compat["common/components/Modal"];var _=t.n(g),N=function(t){function o(){return t.apply(this,arguments)||this}y(o,t);var e=o.prototype;return e.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("p",null,s().translator.trans("michaelbelgium-discussion-views.forum.modal_resetviews.label",{count:this.attrs.discussion.viewCount()})),m("div",{className:"Form-group"},v().component({className:"Button Button--primary Button--block",type:"submit",loading:this.loading},s().translator.trans("michaelbelgium-discussion-views.forum.modal_resetviews.submit_button")))))},e.title=function(){return s().translator.trans("michaelbelgium-discussion-views.forum.modal_resetviews.title")},e.className=function(){return"Modal--small"},e.onsubmit=function(t){var o=this;t.preventDefault(),this.loading=!0,this.attrs.discussion.save({resetViews:!0}).catch((function(){o.loaded()})),this.hide()},o}(_());const M=flarum.core.compat["common/helpers/username"];var D=t.n(M);const O=flarum.core.compat["common/helpers/icon"];var V=t.n(O);const x=flarum.core.compat["common/helpers/punctuateSeries"];var P=t.n(x);const L=flarum.core.compat["common/helpers/avatar"];var S=t.n(L);const j=flarum.core.compat["common/utils/ItemList"];var C=t.n(j);const k=flarum.core.compat["common/utils/humanTime"];var F=t.n(k);const A=flarum.core.compat["forum/components/CommentPost"];var B=t.n(A);const I=flarum.core.compat["common/components/Link"];var q=t.n(I);const U=flarum.core.compat["forum/components/DiscussionPage"];var T=t.n(U);const R=flarum.core.compat["common/components/FieldSet"];var z=t.n(R),E=function(t){function o(){return t.apply(this,arguments)||this}y(o,t);var e=o.prototype;return e.className=function(){return"Modal--small"},e.title=function(){return s().translator.trans("michaelbelgium-discussion-views.forum.post.modal_title_text")},e.content=function(){var t=this.attrs.post.discussion().uniqueViews().map((function(t){var o=t.user();return m("li",null,m(q(),{href:s().route.user(o)},S()(o)," ",D()(o)))}));return m("div",{className:"Modal-body"},m("ul",{className:"PostLikesModal-list"},t))},o}(_());const G=flarum.core.compat["common/extenders"];var H=t.n(G);const J=flarum.core.compat["common/models/Discussion"];var K=t.n(J);const Q=flarum.core.compat["common/Model"];var W=t.n(Q),X=function(t){function o(){for(var o,e=arguments.length,s=new Array(e),n=0;n<e;n++)s[n]=arguments[n];return(o=t.call.apply(t,[this].concat(s))||this).visitedAt=W().attribute("visited_at",W().transformDate),o.user=W().hasOne("user"),o.discussion=W().hasOne("discussion"),o}return y(o,t),o}(W());const Y=[(new(H().Store)).add("discussionviews",X),new(H().Model)(K()).attribute("canReset").attribute("viewCount").attribute("canViewNumber").hasMany("latestViews").hasMany("uniqueViews")];s().initializers.add("michaelbelgium-discussion-views",(function(){(0,n.extend)(i().prototype,"sortMap",(function(t){1==s().forum.attribute("toggleFilter")&&(t.popular="-view_count",t.unpopular="view_count")})),(0,n.extend)(u().prototype,"infoItems",(function(t){if(this.attrs.discussion.canViewNumber()){var o=this.attrs.discussion.viewCount(),e=1==s().forum.attribute("abbrNumber")?p()(o):o;t.add("discussion-views",m("span",e))}})),(0,n.extend)(l().prototype,"requestParams",(function(t){t.include.push("latestViews")})),(0,n.extend)(b(),"moderationControls",(function(t,o){o.canReset()&&o.viewCount()>0&&t.add("reset",v().component({icon:"far fa-eye-slash",onclick:function(){return s().modal.show(N,{discussion:o})}},s().translator.trans("michaelbelgium-discussion-views.forum.discussion_controls.resetviews_button")))})),(0,n.extend)(T().prototype,"sidebarItems",(function(t){if(0!=s().forum.attribute("showViewList")){var o=this.discussion.latestViews(),e=new(C());o.forEach((function(t,o){var n=!1===t.user()?s().translator.trans("michaelbelgium-discussion-views.forum.viewlist.guest"):t.user().username(),r=m("div",{className:"item-lastUser-content"},[S()(t.user()),m("div",[n,m("span",{className:"lastUser-visited",title:t.visitedAt().toLocaleString()},F()(t.visitedAt()))])]);!1!==t.user()&&(r=q().component({href:s().route.user(t.user())},r)),e.add("lastUser-"+o,r)})),t.add("lastDiscussionViewers",z().component({className:"LastDiscussionUsers",label:s().translator.trans("michaelbelgium-discussion-views.forum.viewlist.title")},e.toArray()))}})),(0,n.extend)(B().prototype,"footerItems",(function(t){if(0!=s().forum.attribute("showFooterViewList")){var o=this.attrs.post,e=o.discussion(),n=e.uniqueViews(),r=e.posts()[0];if(void 0!==r&&r.id()===o.id()&&n&&n.length>0){var i=n.map((function(t){return q().component({href:s().route.user(t.user())},t.user()===s().session.user?s().translator.trans("michaelbelgium-discussion-views.forum.post.you"):D()(t.user()))}));if(n.length>5){var a=n.length-5;i.push(q().component({href:"#",onclick:function(t){t.preventDefault(),s().modal.show(E,{post:o})}},s().translator.trans("michaelbelgium-discussion-views.forum.post.others_link",{count:a})))}i.length>0&&t.add("viewed",m("div",{className:"Post-Discussion-viewedBy"},[V()("fas fa-eye"),s().translator.trans("michaelbelgium-discussion-views.forum.post.viewed_by",{users:P()(i)})]))}}}))}))})(),module.exports=o})();
//# sourceMappingURL=forum.js.map