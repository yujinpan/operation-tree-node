/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
"use strict";function r(r){return!(!Array.isArray(r)||!r.length)}module.exports=function(n,e){var t,i,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{children:"children"},u=null;return function n(c,o){var a,f=c.length;for(a=0;a<f;a++){if(i=c[a],e(i,a,c,o)){u=i;break}if(r(t=i[l.children])&&(i=n(t,i))){u=i;break}}return u}(n,null)};