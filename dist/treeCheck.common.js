/*!
 * operation-tree-node v1.0.2
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";function e(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function n(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function r(e){return!(!Array.isArray(e)||!e.length)}function t(e,n){var t,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"};!function e(i,o){i.forEach((function(i,u,f){t=i[c.children],!1!==n(i,u,f,o)&&r(t)&&e(t,i)}))}(e,null)}function c(e,n){var r,t=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{parent:"parent"}).parent;e.forEach((function(e){!function e(c){r=c[t];r&&!1!==n(r)&&e(r)}(e)}))}module.exports=function(i,o){var u,f=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{id:"id",children:"children",parent:"parent"},l=f.children,a=f.id,h=[],d=[],p=function(e){d.push(e[a]),e._checked=!0};return t(function(e,n){var t,c=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"}).children;return function e(i,o){return i.map((function(i,u,f){var l=n(i,u,f,o);return r(t=l[c])&&(l[c]=e(t,l)),l}))}(e)}(i,(function(r,t,c,i){return function(r){for(var t=1;t<arguments.length;t++){var c=null!=arguments[t]?arguments[t]:{};t%2?n(c,!0).forEach((function(n){e(r,n,c[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(c)):n(c).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(c,e))}))}return r}({},r,{_checked:!1,parent:i})}),f),(function(e){if(e._checked)return!1;o.includes(e[a])&&(p(e),h.push(e),r(u=e[l])&&t(u,(function(e){p(e)}),f))}),f),c(h,(function(e){if(e._checked)return!1;var n=e[l].length;if(1===n)p(e);else{var r=e._checkedCount||0;e._checkedCount=r+1,e._checkedCount===n&&p(e)}}),f),d};