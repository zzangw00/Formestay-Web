(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[20],{1182:function(e,t,a){"use strict";a.r(t);var r=a(631),n=a.n(r),c=a(632),o=a(628),s=a(1),u=a.n(s),i=a(19),l=a(614),O=a(644),E=a(679),T=a(629),m=a(663),p=a(624);t.default=function(){var e=Object(i.g)(),t=Object(s.useState)(""),a=Object(o.a)(t,2),r=a[0],R=a[1],S=Object(s.useState)(""),A=Object(o.a)(S,2),I=A[0],d=A[1],P=Object(s.useState)(Object(m.a)()),_=Object(o.a)(P,2),b=_[0],j=_[1],g=Object(s.useCallback)((function(){b&&e.push("/")}),[e,b]),f=Object(s.useCallback)(function(){var e=Object(c.a)(n.a.mark((function e(t){var a,c,o;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!Object(p.a)(r.trim())){e.next=4;break}return alert("\uc544\uc774\ub514\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694."),e.abrupt("return");case 4:if(!Object(p.a)(I)){e.next=7;break}return alert("\ud328\uc2a4\uc6cc\ub4dc\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694."),e.abrupt("return");case 7:return e.prev=7,e.next=10,T.c.request({data:{email:r.trim(),password:I},method:T.b.POST,url:T.a.POST_ADMIN_LOGIN});case 10:if(c=e.sent,(null===(o=c.data)||void 0===o?void 0:o.isSuccess)&&!Object(p.a)(null===o||void 0===o||null===(a=o.result)||void 0===a?void 0:a.jwt)){e.next=15;break}return alert(null===o||void 0===o?void 0:o.message),e.abrupt("return");case 15:Object(E.b)("jwt",o.result.jwt),j(!0),e.next=23;break;case 19:e.prev=19,e.t0=e.catch(7),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 23:case"end":return e.stop()}}),e,null,[[7,19]])})));return function(t){return e.apply(this,arguments)}}(),[r,I]);return u.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},g(),u.a.createElement(l.k,null,u.a.createElement(l.G,{className:"justify-content-center"},u.a.createElement(l.j,{md:"6"},u.a.createElement(l.i,null,u.a.createElement(l.f,{className:"p-4"},u.a.createElement(l.g,null,u.a.createElement(l.p,null,u.a.createElement("h1",null,"Login"),u.a.createElement("p",{className:"text-muted"},"Sign In to your account"),u.a.createElement(l.v,{className:"mb-3"},u.a.createElement(l.x,null,u.a.createElement(l.y,null,u.a.createElement(O.a,{name:"cil-user"}))),u.a.createElement(l.u,{type:"text",placeholder:"Username",autoComplete:"username",value:r,onChange:function(e){return R(e.target.value)}})),u.a.createElement(l.v,{className:"mb-4"},u.a.createElement(l.x,null,u.a.createElement(l.y,null,u.a.createElement(O.a,{name:"cil-lock-locked"}))),u.a.createElement(l.u,{type:"password",placeholder:"Password",autoComplete:"current-password",value:I,onChange:function(e){return d(e.target.value)}})),u.a.createElement(l.G,null,u.a.createElement(l.j,{xs:"6"},u.a.createElement(l.e,{color:"primary",className:"px-4",onClick:f},"Login")))))))))))}},624:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return c}));var r=function(e){return""===e||null===e||void 0===e||"object"===typeof e&&!Object.keys(e).length};function n(e){return e.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)}function c(e){return e.match(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)}},629:function(e,t,a){"use strict";a.d(t,"a",(function(){return T})),a.d(t,"b",(function(){return S})),a.d(t,"c",(function(){return A}));var r,n,c,o=a(628),s=a(157),u=a(158),i=a(734),l=a.n(i),O=a(159),E="http://api.formestay.com/admin";console.log(E);var T={POST_ADMIN_LOGIN:"".concat(E,"/login"),GET_USERS:"".concat(E,"/users"),GET_USER:"".concat(E,"/users/:userId"),POST_USER:"".concat(E,"/users"),PATCH_USER:"".concat(E,"/users/:userId"),PATCH_USER_STATUS:"".concat(E,"/users/:userId/status"),GET_AUTO_LOGIN:"".concat(E,"/auto-login"),POST_ADMIN:"".concat(E),GET_ADMINS:"".concat(E,"/admins"),GET_STATUS:"".concat(E),GET_ENTERPRISES:"".concat(E,"/enterprises"),GET_ENTERPRISE:"".concat(E,"/enterprises/:enterpriseId"),GET_PROGRAMS:"".concat(E,"/programs/:enterpriseId"),GET_PROGRAM:"".concat(E,"/program/:programId"),GET_PROGRAMIMAGES:"".concat(E,"/program/:programId/images"),GET_PROGRAMINFO:"".concat(E,"/program/:programId/programInfo"),GET_MEALINFO:"".concat(E,"/program/:programId/mealInfo"),PATCH_ENTERPRISE:"".concat(E,"/enterprises/:enterpriseId"),PATCH_ENTERPRISE_STATUS:"".concat(E,"/enterprises/:enterpriseId/status"),POST_ENTERPRISE:"".concat(E,"/enterprise"),PATCH_PROGRAM_STATUS:"".concat(E,"/program/:programId/status"),PATCH_PROGRAM:"".concat(E,"/program/:programId"),POST_ROOMPRICE:"".concat(E,"/program/price"),GET_ROOMPRICE:"".concat(E,"/program/programRoomPrice/:programRoomPriceId"),PATCH_ROOMPRICE:"".concat(E,"/program/programRoomPrice/:programRoomPriceId"),PATCH_ROOMPRICE_STATUS:"".concat(E,"/programRoomPrice/:programRoomPriceId/status"),POST_PROGRAM:"".concat(E,"/enterprise/:enterpriseId/program"),GET_RESERVATIONS:"".concat(E,"/enterprise/:enterpriseId/reservations"),GET_RESERVATION:"".concat(E,"/reservations/:reservationId"),PATCH_RESERVATION_REGIST:"".concat(E,"/reservations/:reservationId/status"),PATCH_RESERVATION_CANCLE:"".concat(E,"/reservations/:reservationId/status-out"),POST_PROGRAMIMAGE:"".concat(E,"/program/:programId/images"),PATCH_PROGRAMIMAGE_STATUS:"".concat(E,"/programImage/:programImageId/status"),PATCH_PROGRAMINFO:"".concat(E,"/programInfo/:programInfoId/programInfo"),POST_PROGRAMINFO:"".concat(E,"/program/:programId/programInfo"),PATCH_MEALINFO:"".concat(E,"/mealInfo/:mealInfoId/mealInfo"),POST_MEALINFO:"".concat(E,"/program/:programId/mealInfo"),GET_PAYMENTS:"".concat(E,"/payments")},m={get:(r={},Object(O.a)(r,T.GET_USERS,{}),Object(O.a)(r,T.GET_USER,{}),Object(O.a)(r,T.GET_STATUS,{}),Object(O.a)(r,T.GET_ADMINS,{}),Object(O.a)(r,T.GET_ENTERPRISES,{}),Object(O.a)(r,T.GET_ENTERPRISE,{}),Object(O.a)(r,T.GET_AUTO_LOGIN,{}),Object(O.a)(r,T.GET_PROGRAMS,{}),Object(O.a)(r,T.GET_PROGRAM,{}),Object(O.a)(r,T.GET_PROGRAMIMAGES,{}),Object(O.a)(r,T.GET_ROOMPRICE,{}),Object(O.a)(r,T.GET_RESERVATIONS,{}),Object(O.a)(r,T.GET_RESERVATION,{}),Object(O.a)(r,T.GET_PROGRAMINFO,{}),Object(O.a)(r,T.GET_MEALINFO,{}),Object(O.a)(r,T.GET_PAYMENTS,{}),r),post:(n={},Object(O.a)(n,T.POST_ADMIN_LOGIN,{}),Object(O.a)(n,T.POST_USER,{}),Object(O.a)(n,T.POST_ADMIN,{}),Object(O.a)(n,T.POST_ENTERPRISE,{}),Object(O.a)(n,T.POST_ROOMPRICE,{}),Object(O.a)(n,T.POST_PROGRAM,{}),Object(O.a)(n,T.POST_PROGRAMIMAGE,{}),Object(O.a)(n,T.POST_PROGRAMINFO,{}),Object(O.a)(n,T.POST_MEALINFO,{}),n),patch:(c={},Object(O.a)(c,T.PATCH_USER,{}),Object(O.a)(c,T.PATCH_USER_STATUS,{}),Object(O.a)(c,T.PATCH_ENTERPRISE,{}),Object(O.a)(c,T.PATCH_ENTERPRISE_STATUS,{}),Object(O.a)(c,T.PATCH_PROGRAM_STATUS,{}),Object(O.a)(c,T.PATCH_PROGRAM,{}),Object(O.a)(c,T.PATCH_ROOMPRICE,{}),Object(O.a)(c,T.PATCH_ROOMPRICE_STATUS,{}),Object(O.a)(c,T.PATCH_RESERVATION_REGIST,{}),Object(O.a)(c,T.PATCH_RESERVATION_CANCLE,{}),Object(O.a)(c,T.PATCH_PROGRAMIMAGE_STATUS,{}),Object(O.a)(c,T.PATCH_PROGRAMINFO,{}),Object(O.a)(c,T.PATCH_MEALINFO,{}),c),put:{},delete:{}},p=a(663),R=a(624),S={DELETE:"delete",GET:"get",POST:"post",PUT:"put",PATCH:"patch"},A=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"request",value:function(e){var t=e.data,a=e.query,r=e.path,n=e.method,c=e.url;try{if(Object(R.a)(n)||Object(R.a)(c))throw new Error("TempAdminApi needs url and method");if(void 0===m[n][c])throw new Error("TempAdminApi does not have the mapping ".concat(n,", ").concat(c));if(r)for(var s=0,u=Object.entries(r);s<u.length;s++){var i=Object(o.a)(u[s],2),O=i[0],E=i[1];c=c.replace(":".concat(O),E)}Object(R.a)(a)||(c+="?"+Object.keys(a).map((function(e){return e+"="+a[e]})).join("&"));var T={accept:"application/json","Content-Type":"application/json","X-Access-Token":Object(p.c)()};switch(n){case S.GET:return l.a.get(c,{headers:T});case S.POST:return l.a.post(c,t,{headers:T});case S.PATCH:return l.a.patch(c,t,{headers:T});case S.PUT:return l.a.put(c,t,{headers:T});case S.DELETE:return l.a.delete(c,t,{headers:T})}}catch(A){return"axios cannot be created"}}}]),e}()},663:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"c",(function(){return l})),a.d(t,"b",(function(){return O}));var r=a(631),n=a.n(r),c=a(632),o=(a(1),a(679)),s=a(624),u=a(629);function i(){return Object(s.a)(Object(o.a)("jwt"))?(window.localStorage.clear(),!1):(function(){var e=Object(c.a)(n.a.mark((function e(){var t,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.c.request({method:u.b.GET,url:u.a.GET_AUTO_LOGIN});case 3:if(t=e.sent,(null===(a=t.data)||void 0===a?void 0:a.isSuccess)&&!Object(s.a)(null===a||void 0===a?void 0:a.result)){e.next=7;break}return e.abrupt("return",!1);case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}()().then(),!0)}function l(){var e=window.localStorage.getItem("jwt");if(!Object(s.a)(e))return JSON.parse(e).value}function O(){window.localStorage.clear()}},679:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return o}));var r=a(704),n=a.n(r);function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:360,a=window.localStorage.getItem(e);if(null!==a){var r=JSON.parse(a),c=new Date(r.expirationDate);if(c>new Date){var o=new Date((new Date).getTime()+6e4*t),s=n()(o).format("YYYY[-]MM[-]DD HH:mm:ss"),u={value:r.value,expirationDate:s};return window.localStorage.setItem(e,JSON.stringify(u)),r.value}window.localStorage.removeItem(e)}return null}function o(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:360,r=new Date((new Date).getTime()+6e4*a),c=n()(r).format("YYYY[-]MM[-]DD HH:mm:ss"),o={value:t,expirationDate:c};window.sessionStorage.setItem(e,JSON.stringify(o)),window.localStorage.setItem(e,JSON.stringify(o))}}}]);
//# sourceMappingURL=20.59275434.chunk.js.map