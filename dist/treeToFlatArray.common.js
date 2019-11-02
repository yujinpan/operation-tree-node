/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";function n(n,r){var t,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"};!function n(o,u){o.forEach((function(o,e,c){t=o[i.children],!1!==r(o,e,c,u)&&function(n){return!(!Array.isArray(n)||!n.length)}(t)&&n(t,o)}))}(n,null)}module.exports=function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(n){return n},i=arguments.length>2?arguments[2]:void 0,o=[];return n(r,(function(){o.push(t.apply(void 0,arguments))}),i),o};