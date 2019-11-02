/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkValidArray(data) {
  return !!(Array.isArray(data) && data.length);
}

/**
 * tree node each(like Array.prototype.forEach)
 * @description recursive will break until callback is false
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * treeEach(treeData, (node, index, arr, parent) => {
 *   console.log(node.name, index, arr, parent);
 * });
 * // '1', 0, [treeData], undefined
 * // '2', 0, [treeData[0].children], [treeData[0]]
 *
 * // use children props
 * const treeData = [{ id: 1, name: '1', child: [...] }];
 * treeEach(treeData, () => {...}, { children: 'child' });
 */
function treeEach(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: 'children'
  };
  var children;

  (function recursive(data, parent) {
    data.forEach(function (node, index, arr) {
      children = node[props.children]; // if callback false, skip children

      if (callback(node, index, arr, parent) !== false && checkValidArray(children)) {
        recursive(children, node);
      }
    });
  })(data, null);
}

export default treeEach;
