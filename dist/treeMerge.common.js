/*!
 * operation-tree-node v1.0.2
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";function r(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function e(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.push.apply(t,n)}return t}function t(r){return function(r){if(Array.isArray(r)){for(var e=0,t=new Array(r.length);e<r.length;e++)t[e]=r[e];return t}}(r)||function(r){if(Symbol.iterator in Object(r)||"[object Arguments]"===Object.prototype.toString.call(r))return Array.from(r)}(r)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function n(r){return!(!Array.isArray(r)||!r.length)}module.exports=function(o,c){var i,u,a,f=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"}).children;return function o(l){var p=[];return l.forEach((function(l){var b=p.find((function(r){return c(r,l)}));i=l[f],b?(u=b[f],n(i)&&(n(u)?b[f]=o([].concat(t(u),t(i))):b[f]=o(i))):(a=function(t){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(o,!0).forEach((function(e){r(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):e(o).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(o,r))}))}return t}({},l),n(i)&&(a[f]=t(i)),p.push(a))})),p}(o)};