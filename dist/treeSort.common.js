/*!
 * operation-tree-node v1.0.1
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";function r(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function e(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.push.apply(t,n)}return t}function t(r){return function(r){if(Array.isArray(r)){for(var e=0,t=new Array(r.length);e<r.length;e++)t[e]=r[e];return t}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function n(r){return!(!Array.isArray(r)||!r.length)}module.exports=function(o,i){var c,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"},a=u.children;return function(r,e){var t,o=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"}).children;return function r(i,c){return i.map((function(i,u,a){var f=e(i,u,a,c);return n(t=f[o])&&(f[o]=r(t,f)),f}))}(r)}(o=t(o).sort(i),(function(o){return c=o[a],o=function(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(o,!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(o).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(o,r))}))}return t}({},o),n(c)&&(o[a]=t(o[a]).sort(i)),o}),u)};