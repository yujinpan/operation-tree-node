/*!
 * operation-tree v1.0.0
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";var n={children:"children",parent:"parent"};function r(r,t){var i,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n;!function n(r,o){r.forEach((function(r,u,c){i=r[e.children],t(r,u,c,o),function(n){return!(!Array.isArray(n)||!n.length)}(i)&&n(i,r)}))}(r,null)}module.exports=function(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(n){return n},e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:n,o=[];return r(t,(function(){o.push(i.apply(void 0,arguments))}),e),o};