(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[9],{619:function(e,a,t){"use strict";t.d(a,"a",(function(){return n})),t.d(a,"b",(function(){return r})),t.d(a,"c",(function(){return o}));var n=function(e){return""===e||null===e||void 0===e||"object"===typeof e&&!Object.keys(e).length};function r(e){return e.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)}function o(e){return e.match(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)}},624:function(e,a,t){"use strict";t.d(a,"a",(function(){return p})),t.d(a,"b",(function(){return f})),t.d(a,"c",(function(){return I}));var n,r,o,c=t(623),s=t(157),u=t(158),i=t(656),m=t.n(i),l=t(159),d="http://api.formestay.com/admin";console.log(d);var p={POST_ADMIN_LOGIN:"".concat(d,"/login"),GET_USERS:"".concat(d,"/users"),GET_USER:"".concat(d,"/users/:userId"),POST_USER:"".concat(d,"/users"),PATCH_USER:"".concat(d,"/users/:userId"),PATCH_USER_STATUS:"".concat(d,"/users/:userId/status"),GET_AUTO_LOGIN:"".concat(d,"/auto-login"),POST_ADMIN:"".concat(d),GET_ENTERPRISES:"".concat(d,"/enterprises"),GET_ENTERPRISE:"".concat(d,"/enterprises/:enterpriseId"),GET_PROGRAMS:"".concat(d,"/programs/:enterpriseId")},b={get:(n={},Object(l.a)(n,p.GET_USERS,{}),Object(l.a)(n,p.GET_USER,{}),Object(l.a)(n,p.GET_ENTERPRISES,{}),Object(l.a)(n,p.GET_ENTERPRISE,{}),Object(l.a)(n,p.GET_AUTO_LOGIN,{}),Object(l.a)(n,p.GET_PROGRAMS,{}),n),post:(r={},Object(l.a)(r,p.POST_ADMIN_LOGIN,{}),Object(l.a)(r,p.POST_USER,{}),Object(l.a)(r,p.POST_ADMIN,{}),r),patch:(o={},Object(l.a)(o,p.PATCH_USER,{}),Object(l.a)(o,p.PATCH_USER_STATUS,{}),o),put:{},delete:{}},E=t(634),h=t(619),f={DELETE:"delete",GET:"get",POST:"post",PUT:"put",PATCH:"patch"},I=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"request",value:function(e){var a=e.data,t=e.query,n=e.path,r=e.method,o=e.url;try{if(Object(h.a)(r)||Object(h.a)(o))throw new Error("TempAdminApi needs url and method");if(void 0===b[r][o])throw new Error("TempAdminApi does not have the mapping ".concat(r,", ").concat(o));if(n)for(var s=0,u=Object.entries(n);s<u.length;s++){var i=Object(c.a)(u[s],2),l=i[0],d=i[1];o=o.replace(":".concat(l),d)}Object(h.a)(t)||(o+="?"+Object.keys(t).map((function(e){return e+"="+t[e]})).join("&"));var p={accept:"application/json","Content-Type":"application/json","X-Access-Token":Object(E.c)()};switch(r){case f.GET:return m.a.get(o,{headers:p});case f.POST:return m.a.post(o,a,{headers:p});case f.PATCH:return m.a.patch(o,a,{headers:p});case f.PUT:return m.a.put(o,a,{headers:p});case f.DELETE:return m.a.delete(o,a,{headers:p})}}catch(I){return"axios cannot be created"}}}]),e}()},634:function(e,a,t){"use strict";t.d(a,"a",(function(){return i})),t.d(a,"c",(function(){return m})),t.d(a,"b",(function(){return l}));var n=t(625),r=t.n(n),o=t(626),c=(t(1),t(638)),s=t(619),u=t(624);t(639);function i(){return Object(s.a)(Object(c.a)("jwt"))?(window.localStorage.clear(),!1):(function(){var e=Object(o.a)(r.a.mark((function e(){var a,t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.c.request({method:u.b.GET,url:u.a.GET_AUTO_LOGIN});case 3:if(a=e.sent,(null===(t=a.data)||void 0===t?void 0:t.isSuccess)&&!Object(s.a)(null===t||void 0===t?void 0:t.result)){e.next=7;break}return e.abrupt("return",!1);case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}()().then(),!0)}function m(){var e=window.localStorage.getItem("jwt");if(!Object(s.a)(e))return JSON.parse(e).value}function l(){window.localStorage.clear()}},638:function(e,a,t){"use strict";t.d(a,"a",(function(){return o})),t.d(a,"b",(function(){return c}));var n=t(646),r=t.n(n);function o(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:360,t=window.localStorage.getItem(e);if(null!==t){var n=JSON.parse(t),o=new Date(n.expirationDate);if(o>new Date){var c=new Date((new Date).getTime()+6e4*a),s=r()(c).format("YYYY[-]MM[-]DD HH:mm:ss"),u={value:n.value,expirationDate:s};return window.localStorage.setItem(e,JSON.stringify(u)),n.value}window.localStorage.removeItem(e)}return null}function c(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:360,n=new Date((new Date).getTime()+6e4*t),o=r()(n).format("YYYY[-]MM[-]DD HH:mm:ss"),c={value:a,expirationDate:o};window.sessionStorage.setItem(e,JSON.stringify(c)),window.localStorage.setItem(e,JSON.stringify(c))}},639:function(e,a,t){"use strict";a.a=[{userIdx:0,nickname:"zero",email:"zero@softsquared.com",phoneNumber:"010-0000-0000",status:"ACTIVE"},{userIdx:1,nickname:"dory",email:"dory@softsquared.com",phoneNumber:"010-0101-0101",status:"INACTIVE"},{userIdx:2,nickname:"ted",email:"ted@softsquared.com",phoneNumber:"010-0202-0202",status:"ACTIVE"},{userIdx:3,nickname:"daphne",email:"daphne@softsquared.com",phoneNumber:"010-0303-0303",status:"ACTIVE"},{userIdx:4,nickname:"grace",email:"grace@softsquared.com",phoneNumber:"010-0404-0404",status:"ACTIVE"},{userIdx:5,nickname:"papa",email:"papa@softsquared.com",phoneNumber:"010-0505-0505",status:"INACTIVE"},{userIdx:6,nickname:"yunix",email:"yunix@softsquared.com",phoneNumber:"010-0606-0606",status:"ACTIVE"},{userIdx:7,nickname:"io",email:"io@softsquared.com",phoneNumber:"010-0707-0707",status:"ACTIVE"},{userIdx:8,nickname:"radih",email:"radih@softsquared.com",phoneNumber:"010-0808-0808",status:"ACTIVE"},{userIdx:9,nickname:"cookie",email:"cookie@softsquared.com",phoneNumber:"010-0909-0909",status:"ACTIVE"},{userIdx:10,nickname:"weaver",email:"weaver@softsquared.com",phoneNumber:"010-1010-1010",status:"INACTIVE"},{userIdx:11,nickname:"aien",email:"aien@softsquared.com",phoneNumber:"010-1111-1111",status:"ACTIVE"},{userIdx:12,nickname:"mary",email:"mary@softsquared.com",phoneNumber:"010-1212-1212",status:"ACTIVE"},{userIdx:13,nickname:"haling",email:"haling@softsquared.com",phoneNumber:"010-1313-1313",status:"ACTIVE"},{userIdx:14,nickname:"zero",email:"zero@softsquared.com",phoneNumber:"010-1414-1414",status:"ACTIVE"},{userIdx:15,nickname:"dory",email:"dory@softsquared.com",phoneNumber:"010-1515-1515",status:"ACTIVE"},{userIdx:16,nickname:"ted",email:"ted@softsquared.com",phoneNumber:"010-1616-1616",status:"INACTIVE"},{userIdx:17,nickname:"daphne",email:"daphne@softsquared.com",phoneNumber:"010-1717-1717",status:"ACTIVE"},{userIdx:18,nickname:"grace",email:"grace@softsquared.com",phoneNumber:"010-1818-1818",status:"ACTIVE"},{userIdx:19,nickname:"papa",email:"papa@softsquared.com",phoneNumber:"010-1919-1919",status:"ACTIVE"},{userIdx:20,nickname:"yunix",email:"yunix@softsquared.com",phoneNumber:"010-2020-2020",status:"ACTIVE"},{userIdx:21,nickname:"io",email:"io@softsquared.com",phoneNumber:"010-2121-2121",status:"INACTIVE"},{userIdx:22,nickname:"radih",email:"radih@softsquared.com",phoneNumber:"010-2222-2222",status:"ACTIVE"},{userIdx:23,nickname:"cookie",email:"cookie@softsquared.com",phoneNumber:"010-2323-2323",status:"ACTIVE"},{userIdx:24,nickname:"weaver",email:"weaver@softsquared.com",phoneNumber:"010-2424-2424",status:"ACTIVE"},{userIdx:25,nickname:"aien",email:"aien@softsquared.com",phoneNumber:"010-2525-2525",status:"ACTIVE"},{userIdx:26,nickname:"mary",email:"mary@softsquared.com",phoneNumber:"010-2626-2626",status:"INACTIVE"},{userIdx:27,nickname:"haling",email:"haling@softsquared.com",phoneNumber:"010-2727-2727",status:"ACTIVE"}]},776:function(e,a,t){"use strict";t.r(a);var n=t(1),r=t.n(n),o=t(19),c=t(615),s=[{path:"/users",exact:!0,name:"\ud68c\uc6d0 \ubaa9\ub85d \uc870\ud68c",component:r.a.lazy((function(){return Promise.all([t.e(1),t.e(8)]).then(t.bind(null,769))}))},{path:"/users/:userId",exact:!0,name:"\ud68c\uc6d0 \uc0c1\uc138 \uc870\ud68c",component:r.a.lazy((function(){return t.e(17).then(t.bind(null,770))}))},{path:"/boards",exact:!0,name:"\uac8c\uc2dc\ubb3c \ubaa9\ub85d \uc870\ud68c",component:r.a.lazy((function(){return Promise.all([t.e(1),t.e(15),t.e(14)]).then(t.bind(null,777))}))},{path:"/boards/:boardIdx",exact:!0,name:"\uac8c\uc2dc\ubb3c \uc0c1\uc138 \uc870\ud68c",component:r.a.lazy((function(){return Promise.all([t.e(3),t.e(12)]).then(t.bind(null,771))}))},{path:"/add-board",exact:!0,name:"\uac8c\uc2dc\ubb3c \ucd94\uac00",component:r.a.lazy((function(){return Promise.all([t.e(3),t.e(11)]).then(t.bind(null,772))}))},{path:"/add-admin",exact:!0,name:"\uad00\ub9ac\uc790 \ucd94\uac00",component:r.a.lazy((function(){return t.e(16).then(t.bind(null,773))}))},{path:"/enterprises",exact:!0,name:"\uc5c5\uccb4 \uc870\ud68c",component:r.a.lazy((function(){return Promise.all([t.e(1),t.e(7)]).then(t.bind(null,774))}))},{path:"/enterprises/:enterpriseId",exact:!0,name:"\uc5c5\uccb4 \uc0c1\uc138 \uc870\ud68c",component:r.a.lazy((function(){return Promise.all([t.e(1),t.e(13)]).then(t.bind(null,775))}))}],u=r.a.createElement("div",{className:"pt-3 text-center"},r.a.createElement("div",{className:"sk-spinner sk-spinner-pulse"})),i=r.a.memo((function(){return r.a.createElement("main",{className:"c-main"},r.a.createElement(c.k,{fluid:!0},r.a.createElement(n.Suspense,{fallback:u},r.a.createElement(o.d,null,s.map((function(e,a){return e.component&&r.a.createElement(o.b,{key:a,path:e.path,exact:e.exact,name:e.name,render:function(a){return r.a.createElement(c.n,null,r.a.createElement(e.component,a))}})})),r.a.createElement(o.a,{from:"/",to:"/users"})))))})),m=t(623),l=t(160),d=t(631),p=t(634),b=function(){var e=Object(l.b)(),a=Object(l.c)((function(e){return e.sidebarShow})),t=Object(n.useState)(!1),u=Object(m.a)(t,2),i=u[0],b=u[1],E=Object(o.g)();return r.a.createElement(c.r,{withSubheader:!0,style:{background:"white"}},r.a.createElement(c.U,{inHeader:!0,className:"ml-md-3 d-lg-none",onClick:function(){var t=!![!1,"responsive"].includes(a)||"responsive";e({type:"set",sidebarShow:t})}}),r.a.createElement(c.U,{inHeader:!0,className:"ml-3 d-md-down-none",onClick:function(){var t=![!0,"responsive"].includes(a)&&"responsive";e({type:"set",sidebarShow:t})}}),r.a.createElement(c.s,{className:"mx-auto d-lg-none",to:"/"},r.a.createElement(d.a,{name:"logo",height:"48",alt:"Logo"})),r.a.createElement(c.t,{className:"d-md-down-none mr-auto"},r.a.createElement("h1",{style:{color:"white",zIndex:8}},"")),r.a.createElement(c.t,{className:"px-3"},r.a.createElement(c.e,{color:"info",to:"/add-admin",className:"mr-1"},"\ud68c\uc6d0\uac00\uc785"),r.a.createElement(c.e,{color:"info",onClick:function(){return b(!i)},className:"mr-1"},"Logout"),r.a.createElement(c.D,{show:i,onClose:function(){return b(!i)},color:"info"},r.a.createElement(c.G,{closeButton:!0},r.a.createElement(c.H,null,"\ud655\uc778")),r.a.createElement(c.E,null,"\uc815\ub9d0\ub85c \ub85c\uadf8\uc544\uc6c3 \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"),r.a.createElement(c.F,null,r.a.createElement(c.e,{color:"info",onClick:function(){Object(p.b)(),E.push("/login")}},"Logout")," ",r.a.createElement(c.e,{color:"secondary",onClick:function(){return b(!i)}},"\ucde8\uc18c")))),r.a.createElement(c.S,{className:"px-3 justify-content-between"},r.a.createElement(c.d,{className:"border-0 c-subheader-nav m-0 px-0 px-md-3",routes:s})))},E=[{_tag:"CSidebarNavDropdown",name:"\ud68c\uc6d0 \uad00\ub9ac",route:"/users",icon:"cil-people",_children:[{_tag:"CSidebarNavItem",name:"\ud68c\uc6d0 \uc870\ud68c",to:"/users"}]},{_tag:"CSidebarNavDropdown",name:"\uc608\uc57d \uad00\ub9ac",route:"/boards",icon:"cil-notes",_children:[{_tag:"CSidebarNavItem",name:"\uc608\uc57d \uc870\ud68c",to:"/boards"},{_tag:"CSidebarNavItem",name:"\uac8c\uc2dc\ubb3c \ucd94\uac00",to:"/add-board"}]},{_tag:"CSidebarNavDropdown",name:"\uc5c5\uccb4 \uad00\ub9ac",route:"/enterprises",icon:"cil-notes",_children:[{_tag:"CSidebarNavItem",name:"\uc5c5\uccb4 \uc870\ud68c",to:"/enterprises"}]},{_tag:"CSidebarNavDropdown",name:"\uacb0\uc81c \uad00\ub9ac",route:"/boards",icon:"cil-notes",_children:[{_tag:"CSidebarNavItem",name:"\uacb0\uc81c \uc774\ub825 \uc870\ud68c",to:"/boards"}]}],h=r.a.memo((function(){var e=Object(l.b)(),a=Object(l.c)((function(e){return e.sidebarShow}));return r.a.createElement(c.J,{show:a,onShowChange:function(a){return e({type:"set",sidebarShow:a})}},r.a.createElement(c.K,{className:"d-md-down-none",to:"/"},r.a.createElement(d.a,{className:"c-sidebar-brand-full",name:"logo-negative",height:35}),r.a.createElement(d.a,{className:"c-sidebar-brand-minimized",name:"sygnet",height:35})),r.a.createElement(c.M,null,r.a.createElement(c.l,{items:E,components:{CSidebarNavDivider:c.N,CSidebarNavDropdown:c.O,CSidebarNavItem:c.P,CSidebarNavTitle:c.Q}})),r.a.createElement(c.L,{className:"c-d-md-down-none"}))})),f=r.a.memo((function(){return r.a.createElement(c.o,{fixed:!1},r.a.createElement("div",null,r.a.createElement("a",{href:"https://coreui.io",target:"_blank",rel:"noopener noreferrer"},"CoreUI"),r.a.createElement("span",{className:"ml-1"},"\xa9 2020 creativeLabs.")),r.a.createElement("div",{className:"mfs-auto"},r.a.createElement("span",{className:"mr-1"},"Powered by"),r.a.createElement("a",{href:"https://coreui.io/react",target:"_blank",rel:"noopener noreferrer"},"CoreUI for React")))}));a.default=function(){var e=Object(o.g)();return r.a.createElement("div",{className:"c-app c-default-layout"},Object(p.a)()||e.push("/login"),r.a.createElement(h,null),r.a.createElement("div",{className:"c-wrapper"},r.a.createElement(b,null),r.a.createElement("div",{className:"c-body"},r.a.createElement(i,null)),r.a.createElement(f,null)))}}}]);
//# sourceMappingURL=9.03c4750f.chunk.js.map