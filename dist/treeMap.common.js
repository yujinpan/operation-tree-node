/*!
 * operation-tree v1.0.0
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";var r={children:"children",parent:"parent"};module.exports=function(n,t){var e,i=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:r).children;return function r(n,u){return n.map((function(n,a,c){var o=t(n,a,c,u);return function(r){return!(!Array.isArray(r)||!r.length)}(e=o[i])&&(o[i]=r(e,o)),o}))}(n)};