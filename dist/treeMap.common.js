/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";module.exports=function(r,n){var t,e=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"}).children;return function r(i,u){return i.map((function(i,c,o){var l=n(i,c,o,u);return function(r){return!(!Array.isArray(r)||!r.length)}(t=l[e])&&(l[e]=r(t,l)),l}))}(r)};