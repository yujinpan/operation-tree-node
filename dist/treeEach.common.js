/*!
 * operation-tree-node v1.0.0
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";var n={children:"children",parent:"parent"};module.exports=function(r,t){var e,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;!function n(r,c){r.forEach((function(r,l,o){e=r[i.children],t(r,l,o,c),function(n){return!(!Array.isArray(n)||!n.length)}(e)&&n(e,r)}))}(r,null)};