(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[16],{1193:function(e,t,a){"use strict";a.r(t);var n=a(668),r=a(628),l=a.n(r),c=a(629),o=a(626),u=a(1),i=a.n(u),s=a(615),m=a(627),b=a(623),p=a(19),f=a(643),h=a(625),d=a(655),E=a(620),v=a(715);t.default=function(e){var t=e.match,a=Object(p.g)(),r=Object(u.useState)(t.params.boardIdx),g=Object(o.a)(r,1)[0],C=Object(u.useState)(0),k=Object(o.a)(C,2),j=k[0],O=k[1],w=Object(u.useState)(""),x=Object(o.a)(w,2),y=x[0],q=x[1],I=Object(u.useState)(""),S=Object(o.a)(I,2),A=S[0],L=S[1],T=Object(u.useState)([]),z=Object(o.a)(T,2),P=z[0],B=z[1],R=Object(u.useState)(!1),D=Object(o.a)(R,2),_=D[0],U=D[1];function F(){return(F=Object(c.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.c.request({method:m.b.PATCH,url:m.a.PATCH_BOARD,path:{boardIdx:g},data:t});case 3:if(n=e.sent,(null===(r=n.data)||void 0===r?void 0:r.isSuccess)&&!Object(b.a)(null===r||void 0===r?void 0:r.result)){e.next=8;break}return alert(r.message),e.abrupt("return");case 8:alert("\uac8c\uc2dc\ubb3c \uc218\uc815\uc5d0 \uc131\uacf5\ud558\uc600\uc2b5\ub2c8\ub2e4."),a.go(0),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function H(){return(H=Object(c.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.c.request({method:m.b.PATCH,url:m.a.PATCH_BOARD_STATUS,path:{boardIdx:t},data:{status:"INACTIVE"}});case 3:if(n=e.sent,(r=n.data).isSuccess){e.next=8;break}return alert(r.message),e.abrupt("return");case 8:alert("\uac8c\uc2dc\ubb3c \uc0ad\uc81c\uc5d0 \uc131\uacf5\ud558\uc600\uc2b5\ub2c8\ub2e4."),a.push("/boards"),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694.");case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}return Object(u.useEffect)((function(){(function(){var e=Object(c.a)(l.a.mark((function e(){var t,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m.c.request({method:m.b.GET,url:m.a.GET_BOARD,path:{boardIdx:g}});case 3:if(t=e.sent,(null===(n=t.data)||void 0===n?void 0:n.isSuccess)&&!Object(b.a)(null===n||void 0===n?void 0:n.result)){e.next=9;break}return alert(n.message),a.push("/boards"),e.abrupt("return");case 9:r=n.result,O(r.userIdx),q(r.title),L(r.contents),B(r.imageUrls),e.next=21;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0),alert("\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc2e4\ud328. \uc7a0\uc2dc\ud6c4 \ub2e4\uc2dc \uc2dc\ub3c4\ud574\uc8fc\uc138\uc694."),a.push("/boards");case 21:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}})()().then()}),[]),i.a.createElement(s.j,null,i.a.createElement(s.f,null,i.a.createElement(s.g,null,i.a.createElement("div",{className:"form-group"},i.a.createElement(h.a,{label:"\uac8c\uc2dc\ubb3c \uace0\uc720\ubc88\ud638",value:g}),i.a.createElement(h.a,{label:"\uc0ac\uc6a9\uc790 \uace0\uc720\ubc88\ud638",value:j}),i.a.createElement(h.a,{label:"\uc81c\ubaa9",placeholder:"\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694",value:y,onChange:_?function(e){return q(e.target.value)}:null}),i.a.createElement(d.a,{label:"\ub0b4\uc6a9",placeholder:"\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694",value:A,onChange:_?function(e){return L(e.target.value)}:null}),i.a.createElement(v.a,{multiple:!0,label:"\uc774\ubbf8\uc9c0",src:P,onChange:_?function(e){B((function(){return[]})),e.target.files.forEach((function(e,t){Object(f.a)("boards","".concat((new Date).getTime(),"_").concat(t,"_").concat(e.name),e).then((function(e){B((function(t){return[].concat(Object(n.a)(t),[e]).sort()}))}))}))}:null})))),i.a.createElement(E.a,{onBackClick:function(){a.push("/boards")},onPatchClick:function(){_?(Object(b.a)(y.trim())&&alert("\uc81c\ubaa9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694."),Object(b.a)(A.trim())&&alert("\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694."),function(e){return F.apply(this,arguments)}({title:y,contents:A,imageUrls:P}).then()):U(!0)},onDeleteClick:function(){window.confirm("\uc815\ub9d0\ub85c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&function(e){return H.apply(this,arguments)}(g).then((function(){}))},patchLabel:_?"\uc218\uc815\uc644\ub8cc":"\uc218\uc815\ud558\uae30"}))}},620:function(e,t,a){"use strict";var n=a(615),r=a(1),l=a.n(r),c=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"success",shape:"square",size:"m",onClick:a},t||"\ub4a4\ub85c\uac00\uae30")},o=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"danger",shape:"square",size:"m",onClick:a},t||"\uc608\uc57d \ucde8\uc18c")},u=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"success",shape:"square",size:"m",onClick:a},t||"\uc608\uc57d \uc2b9\uc778")},i=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"success",shape:"square",size:"m",onClick:a},t||"\ub2eb\uae30")},s=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"success",shape:"square",size:"m",onClick:a},t||"\ud504\ub85c\uadf8\ub7a8 \ucd94\uac00\ud558\uae30")},m=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"success",shape:"square",size:"m",onClick:a},t||"\ucd94\uac00\ud558\uae30")},b=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"primary",shape:"square",size:"m",onClick:a},t||"\uc218\uc815\ud558\uae30")},p=function(e){var t=e.label,a=e.onClick;return l.a.createElement(n.e,{color:"danger",shape:"square",size:"m",onClick:a},t||"\uc0ad\uc81c\ud558\uae30")};t.a=function(e){var t=e.onCancleClick,a=e.onRegistClick,r=e.onBackClick,f=e.onPostClick,h=e.onPatchClick,d=e.onDeleteClick,E=e.backLabel,v=e.postLabel,g=e.patchLabel,C=e.deleteLabel,k=e.cancleLabel,j=e.registLabel,O=e.RoomPostLabel,w=e.onCloseClick,x=e.onRoomPostClick;return l.a.createElement(n.I,null,r?l.a.createElement(n.j,{align:"left"},l.a.createElement(c,{label:E,onClick:r})):l.a.createElement("p",null),w?l.a.createElement(n.j,{align:"left"},l.a.createElement(i,{label:E,onClick:w})):l.a.createElement("p",null),l.a.createElement(n.j,{align:"right"},x&&l.a.createElement(m,{label:O,onClick:x}),"\xa0\xa0",a&&l.a.createElement(u,{label:j,onClick:a}),"\xa0\xa0",t&&l.a.createElement(o,{label:k,onClick:t}),"\xa0\xa0",f&&l.a.createElement(s,{label:v,onClick:f}),"\xa0\xa0",h&&l.a.createElement(b,{label:g,onClick:h}),"\xa0\xa0",d&&l.a.createElement(p,{label:C,onClick:d})),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null))}},625:function(e,t,a){"use strict";var n=a(1),r=a.n(n),l=a(615);t.a=function(e){var t=e.type,a=e.label,n=e.placeholder,c=e.value,o=e.onChange;return r.a.createElement(l.q,{row:!0},r.a.createElement(l.j,{md:"2",align:"right"},r.a.createElement(l.B,{htmlFor:"text-input"},a)),r.a.createElement(l.j,null,r.a.createElement(l.v,{type:t||"text",autoComplete:"password"===t?"on":"off",disabled:!o,placeholder:n,value:c||"",onChange:o})))}},638:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n={apiKey:"AIzaSyAc5JubmtbofQUZ-3cLmq9oWGjysVUdtRQ",authDomain:"formestay-21-71170.firebaseapp.com",projectId:"formestay-21-71170",storageBucket:"formestay-21-71170.appspot.com",messagingSenderId:"127128062403",appId:"1:127128062403:web:d54bd60b7c0f90b6415576",measurementId:"G-1H3NF6W7VM"}},643:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(663),r=a(638);n.a.initializeApp(r.a);n.a.database();var l=n.a.storage();function c(e,t,a){return new Promise((function(n,r){l.ref("".concat(e,"/").concat(t)).put(a).on("state_changed",(function(){}),(function(e){console.log(e),r()}),(function(){l.ref("".concat(e)).child(t).getDownloadURL().then((function(e){n(e)}))}))}))}},655:function(e,t,a){"use strict";var n=a(1),r=a.n(n),l=a(615);t.a=function(e){var t=e.label,a=e.placeholder,n=e.value,c=e.onChange;return r.a.createElement(l.q,{row:!0},r.a.createElement(l.j,{md:"2",align:"right"},r.a.createElement(l.B,{htmlFor:"text-input"},t)),r.a.createElement(l.j,null,r.a.createElement(l.T,{rows:"10",disabled:!c,placeholder:a,value:n,onChange:c})))}},715:function(e,t,a){"use strict";var n=a(1),r=a.n(n),l=a(615);t.a=function(e){var t=e.multiple,a=e.label,n=e.src,c=e.isLoading,o=e.onChange;return r.a.createElement(l.q,{row:!0},r.a.createElement(l.j,{md:"2",align:"right"},r.a.createElement(l.B,{htmlFor:"text-input"},a)),r.a.createElement(l.j,null,o&&r.a.createElement(r.a.Fragment,null,r.a.createElement(l.w,{multiple:t||!1,accept:"image/*",onChange:o}),r.a.createElement("br",null)),t?n.map((function(e,t){return r.a.createElement(l.u,{key:"image_".concat(t),src:e,height:"150",fluid:!0})})):c?r.a.createElement(l.R,{style:{width:120,height:120}}):r.a.createElement(l.u,{src:n,height:"150",fluid:!0})))}}}]);
//# sourceMappingURL=16.7b4a51bd.chunk.js.map