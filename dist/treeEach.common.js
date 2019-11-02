/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";module.exports=function(n,r){var i,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"};!function n(c,e){c.forEach((function(c,l,o){i=c[t.children],!1!==r(c,l,o,e)&&function(n){return!(!Array.isArray(n)||!n.length)}(i)&&n(i,c)}))}(n,null)};