(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[20],{1187:function(e,t,a){"use strict";a.r(t);var r=a(628),n=a.n(r),c=a(629),o=a(626),s=a(1),u=a.n(s),i=a(19),m=a(615),l=a(646),d=a(682),E=a(627),p=a(665),T=a(623);t.default=function(){var e=Object(i.g)(),t=Object(s.useState)(""),a=Object(o.a)(t,2),r=a[0],I=a[1],O=Object(s.useState)(""),A=Object(o.a)(O,2),b=A[0],R=A[1],f=Object(s.useState)(Object(p.a)()),S=Object(o.a)(f,2),P=S[0],h=S[1],_=Object(s.useCallback)((function(){P&&e.push("/")}),[e,P]),N=Object(s.useCallback)(function(){var e=Object(c.a)(n.a.mark((function e(t){var a,c,o;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!Object(T.a)(r.trim())){e.next=4;break}return alert("\uc544\uc774\ub514\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694."),e.abrupt("return");case 4:if(!Object(T.a)(b)){e.next=7;break}return alert("\ud328\uc2a4\uc6cc\ub4dc\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694."),e.abrupt("return");case 7:return e.prev=7,e.next=10,E.c.request({data:{email:r.trim(),password:b},method:E.b.POST,url:E.a.POST_ADMIN_LOGIN});case 10:if(c=e.sent,(null===(o=c.data)||void 0===o?void 0:o.isSuccess)&&!Object(T.a)(null===o||void 0===o||null===(a=o.result)||void 0===a?void 0:a.jwt)){e.next=15;break}return alert(null===o||void 0===o?void 0:o.message),e.abrupt("return");case 15:Object(d.b)("jwt",o.result.jwt),h(!0),e.next=23;break;case 19:e.prev=19,e.t0=e.catch(7),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 23:case"end":return e.stop()}}),e,null,[[7,19]])})));return function(t){return e.apply(this,arguments)}}(),[r,b]);return u.a.createElement("div",{className:"c-app c-default-layout flex-row align-items-center"},_(),u.a.createElement(m.k,null,u.a.createElement(m.I,{className:"justify-content-center"},u.a.createElement(m.j,{md:"6"},u.a.createElement(m.i,null,u.a.createElement(m.f,{className:"p-4"},u.a.createElement(m.g,null,u.a.createElement(m.p,null,u.a.createElement("h1",null,"Login"),u.a.createElement("p",{className:"text-muted"},"Sign In to your account"),u.a.createElement(m.x,{className:"mb-3"},u.a.createElement(m.z,null,u.a.createElement(m.A,null,u.a.createElement(l.a,{name:"cil-user"}))),u.a.createElement(m.v,{type:"text",placeholder:"Username",autoComplete:"username",value:r,onChange:function(e){return I(e.target.value)}})),u.a.createElement(m.x,{className:"mb-4"},u.a.createElement(m.z,null,u.a.createElement(m.A,null,u.a.createElement(l.a,{name:"cil-lock-locked"}))),u.a.createElement(m.v,{type:"password",placeholder:"Password",autoComplete:"current-password",value:b,onChange:function(e){return R(e.target.value)}})),u.a.createElement(m.I,null,u.a.createElement(m.j,{xs:"6"},u.a.createElement(m.e,{color:"primary",className:"px-4",onClick:N},"Login")))))))))))}},623:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return c}));var r=function(e){return""===e||null===e||void 0===e||"object"===typeof e&&!Object.keys(e).length};function n(e){return e.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)}function c(e){return e.match(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)}},627:function(e,t,a){"use strict";a.d(t,"a",(function(){return E})),a.d(t,"b",(function(){return O})),a.d(t,"c",(function(){return A}));var r,n,c,o=a(626),s=a(157),u=a(158),i=a(738),m=a.n(i),l=a(159),d="http://api.formestay.com/admin";console.log(d);var E={POST_ADMIN_LOGIN:"".concat(d,"/login"),GET_USERS:"".concat(d,"/users"),GET_USER:"".concat(d,"/users/:userId"),POST_USER:"".concat(d,"/users"),PATCH_USER:"".concat(d,"/users/:userId"),PATCH_USER_STATUS:"".concat(d,"/users/:userId/status"),GET_AUTO_LOGIN:"".concat(d,"/auto-login"),POST_ADMIN:"".concat(d),GET_ENTERPRISES:"".concat(d,"/enterprises"),GET_ENTERPRISE:"".concat(d,"/enterprises/:enterpriseId"),GET_PROGRAMS:"".concat(d,"/programs/:enterpriseId"),GET_PROGRAM:"".concat(d,"/program/:programId"),GET_PROGRAMIMAGES:"".concat(d,"/program/:programId/images"),PATCH_ENTERPRISE:"".concat(d,"/enterprises/:enterpriseId"),PATCH_ENTERPRISE_STATUS:"".concat(d,"/enterprises/:enterpriseId/status"),POST_ENTERPRISE:"".concat(d,"/enterprise"),PATCH_PROGRAM_STATUS:"".concat(d,"/program/:programId/status"),PATCH_PROGRAM:"".concat(d,"/program/:programId"),POST_ROOMPRICE:"".concat(d,"/program/price"),GET_ROOMPRICE:"".concat(d,"/program/programRoomPrice/:programRoomPriceId"),PATCH_ROOMPRICE:"".concat(d,"/program/programRoomPrice/:programRoomPriceId"),PATCH_ROOMPRICE_STATUS:"".concat(d,"/programRoomPrice/:programRoomPriceId/status"),POST_PROGRAM:"".concat(d,"/enterprise/:enterpriseId/program"),GET_RESERVATIONS:"".concat(d,"/enterprise/:enterpriseId/reservations"),GET_RESERVATION:"".concat(d,"/reservations/:reservationId"),PATCH_RESERVATION_REGIST:"".concat(d,"/reservations/:reservationId/status"),PATCH_RESERVATION_CANCLE:"".concat(d,"/reservations/:reservationId/status-out"),POST_PROGRAMIMAGE:"".concat(d,"/program/:programId/images"),PATCH_PROGRAMIMAGE_STATUS:"".concat(d,"/programImage/:programImageId/status")},p={get:(r={},Object(l.a)(r,E.GET_USERS,{}),Object(l.a)(r,E.GET_USER,{}),Object(l.a)(r,E.GET_ENTERPRISES,{}),Object(l.a)(r,E.GET_ENTERPRISE,{}),Object(l.a)(r,E.GET_AUTO_LOGIN,{}),Object(l.a)(r,E.GET_PROGRAMS,{}),Object(l.a)(r,E.GET_PROGRAM,{}),Object(l.a)(r,E.GET_PROGRAMIMAGES,{}),Object(l.a)(r,E.GET_ROOMPRICE,{}),Object(l.a)(r,E.GET_RESERVATIONS,{}),Object(l.a)(r,E.GET_RESERVATION,{}),r),post:(n={},Object(l.a)(n,E.POST_ADMIN_LOGIN,{}),Object(l.a)(n,E.POST_USER,{}),Object(l.a)(n,E.POST_ADMIN,{}),Object(l.a)(n,E.POST_ENTERPRISE,{}),Object(l.a)(n,E.POST_ROOMPRICE,{}),Object(l.a)(n,E.POST_PROGRAM,{}),Object(l.a)(n,E.POST_PROGRAMIMAGE,{}),n),patch:(c={},Object(l.a)(c,E.PATCH_USER,{}),Object(l.a)(c,E.PATCH_USER_STATUS,{}),Object(l.a)(c,E.PATCH_ENTERPRISE,{}),Object(l.a)(c,E.PATCH_ENTERPRISE_STATUS,{}),Object(l.a)(c,E.PATCH_PROGRAM_STATUS,{}),Object(l.a)(c,E.PATCH_PROGRAM,{}),Object(l.a)(c,E.PATCH_ROOMPRICE,{}),Object(l.a)(c,E.PATCH_ROOMPRICE_STATUS,{}),Object(l.a)(c,E.PATCH_RESERVATION_REGIST,{}),Object(l.a)(c,E.PATCH_RESERVATION_CANCLE,{}),Object(l.a)(c,E.PATCH_PROGRAMIMAGE_STATUS,{}),c),put:{},delete:{}},T=a(665),I=a(623),O={DELETE:"delete",GET:"get",POST:"post",PUT:"put",PATCH:"patch"},A=function(){function e(){Object(s.a)(this,e)}return Object(u.a)(e,null,[{key:"request",value:function(e){var t=e.data,a=e.query,r=e.path,n=e.method,c=e.url;try{if(Object(I.a)(n)||Object(I.a)(c))throw new Error("TempAdminApi needs url and method");if(void 0===p[n][c])throw new Error("TempAdminApi does not have the mapping ".concat(n,", ").concat(c));if(r)for(var s=0,u=Object.entries(r);s<u.length;s++){var i=Object(o.a)(u[s],2),l=i[0],d=i[1];c=c.replace(":".concat(l),d)}Object(I.a)(a)||(c+="?"+Object.keys(a).map((function(e){return e+"="+a[e]})).join("&"));var E={accept:"application/json","Content-Type":"application/json","X-Access-Token":Object(T.c)()};switch(n){case O.GET:return m.a.get(c,{headers:E});case O.POST:return m.a.post(c,t,{headers:E});case O.PATCH:return m.a.patch(c,t,{headers:E});case O.PUT:return m.a.put(c,t,{headers:E});case O.DELETE:return m.a.delete(c,t,{headers:E})}}catch(A){return"axios cannot be created"}}}]),e}()},665:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"c",(function(){return m})),a.d(t,"b",(function(){return l}));var r=a(628),n=a.n(r),c=a(629),o=(a(1),a(682)),s=a(623),u=a(627);a(683);function i(){return Object(s.a)(Object(o.a)("jwt"))?(window.localStorage.clear(),!1):(function(){var e=Object(c.a)(n.a.mark((function e(){var t,a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.c.request({method:u.b.GET,url:u.a.GET_AUTO_LOGIN});case 3:if(t=e.sent,(null===(a=t.data)||void 0===a?void 0:a.isSuccess)&&!Object(s.a)(null===a||void 0===a?void 0:a.result)){e.next=7;break}return e.abrupt("return",!1);case 7:e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}()().then(),!0)}function m(){var e=window.localStorage.getItem("jwt");if(!Object(s.a)(e))return JSON.parse(e).value}function l(){window.localStorage.clear()}},682:function(e,t,a){"use strict";a.d(t,"a",(function(){return c})),a.d(t,"b",(function(){return o}));var r=a(706),n=a.n(r);function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:360,a=window.localStorage.getItem(e);if(null!==a){var r=JSON.parse(a),c=new Date(r.expirationDate);if(c>new Date){var o=new Date((new Date).getTime()+6e4*t),s=n()(o).format("YYYY[-]MM[-]DD HH:mm:ss"),u={value:r.value,expirationDate:s};return window.localStorage.setItem(e,JSON.stringify(u)),r.value}window.localStorage.removeItem(e)}return null}function o(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:360,r=new Date((new Date).getTime()+6e4*a),c=n()(r).format("YYYY[-]MM[-]DD HH:mm:ss"),o={value:t,expirationDate:c};window.sessionStorage.setItem(e,JSON.stringify(o)),window.localStorage.setItem(e,JSON.stringify(o))}},683:function(e,t,a){"use strict";t.a=[{userIdx:0,nickname:"zero",email:"zero@softsquared.com",phoneNumber:"010-0000-0000",status:"ACTIVE"},{userIdx:1,nickname:"dory",email:"dory@softsquared.com",phoneNumber:"010-0101-0101",status:"INACTIVE"},{userIdx:2,nickname:"ted",email:"ted@softsquared.com",phoneNumber:"010-0202-0202",status:"ACTIVE"},{userIdx:3,nickname:"daphne",email:"daphne@softsquared.com",phoneNumber:"010-0303-0303",status:"ACTIVE"},{userIdx:4,nickname:"grace",email:"grace@softsquared.com",phoneNumber:"010-0404-0404",status:"ACTIVE"},{userIdx:5,nickname:"papa",email:"papa@softsquared.com",phoneNumber:"010-0505-0505",status:"INACTIVE"},{userIdx:6,nickname:"yunix",email:"yunix@softsquared.com",phoneNumber:"010-0606-0606",status:"ACTIVE"},{userIdx:7,nickname:"io",email:"io@softsquared.com",phoneNumber:"010-0707-0707",status:"ACTIVE"},{userIdx:8,nickname:"radih",email:"radih@softsquared.com",phoneNumber:"010-0808-0808",status:"ACTIVE"},{userIdx:9,nickname:"cookie",email:"cookie@softsquared.com",phoneNumber:"010-0909-0909",status:"ACTIVE"},{userIdx:10,nickname:"weaver",email:"weaver@softsquared.com",phoneNumber:"010-1010-1010",status:"INACTIVE"},{userIdx:11,nickname:"aien",email:"aien@softsquared.com",phoneNumber:"010-1111-1111",status:"ACTIVE"},{userIdx:12,nickname:"mary",email:"mary@softsquared.com",phoneNumber:"010-1212-1212",status:"ACTIVE"},{userIdx:13,nickname:"haling",email:"haling@softsquared.com",phoneNumber:"010-1313-1313",status:"ACTIVE"},{userIdx:14,nickname:"zero",email:"zero@softsquared.com",phoneNumber:"010-1414-1414",status:"ACTIVE"},{userIdx:15,nickname:"dory",email:"dory@softsquared.com",phoneNumber:"010-1515-1515",status:"ACTIVE"},{userIdx:16,nickname:"ted",email:"ted@softsquared.com",phoneNumber:"010-1616-1616",status:"INACTIVE"},{userIdx:17,nickname:"daphne",email:"daphne@softsquared.com",phoneNumber:"010-1717-1717",status:"ACTIVE"},{userIdx:18,nickname:"grace",email:"grace@softsquared.com",phoneNumber:"010-1818-1818",status:"ACTIVE"},{userIdx:19,nickname:"papa",email:"papa@softsquared.com",phoneNumber:"010-1919-1919",status:"ACTIVE"},{userIdx:20,nickname:"yunix",email:"yunix@softsquared.com",phoneNumber:"010-2020-2020",status:"ACTIVE"},{userIdx:21,nickname:"io",email:"io@softsquared.com",phoneNumber:"010-2121-2121",status:"INACTIVE"},{userIdx:22,nickname:"radih",email:"radih@softsquared.com",phoneNumber:"010-2222-2222",status:"ACTIVE"},{userIdx:23,nickname:"cookie",email:"cookie@softsquared.com",phoneNumber:"010-2323-2323",status:"ACTIVE"},{userIdx:24,nickname:"weaver",email:"weaver@softsquared.com",phoneNumber:"010-2424-2424",status:"ACTIVE"},{userIdx:25,nickname:"aien",email:"aien@softsquared.com",phoneNumber:"010-2525-2525",status:"ACTIVE"},{userIdx:26,nickname:"mary",email:"mary@softsquared.com",phoneNumber:"010-2626-2626",status:"INACTIVE"},{userIdx:27,nickname:"haling",email:"haling@softsquared.com",phoneNumber:"010-2727-2727",status:"ACTIVE"}]}}]);
//# sourceMappingURL=20.cebc54ff.chunk.js.map