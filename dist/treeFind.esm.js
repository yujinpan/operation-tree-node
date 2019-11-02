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
 * tree node find(like Array.prototype.find)
 * @description recursive will break until found
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
 *   { id: 1, name: '1', children: [{ id: 2, name: '2' }] }
 * ];
 *
 * const find = treeFind(treeData, (node) => node.id === 2);
 * console.log(find);
 * // { id: 2, name: '2' }
 */
function treeFind(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: 'children'
  };
  var children,
      node,
      find = null;
  return function recursive(data, parent) {
    var len = data.length;
    var index;

    for (index = 0; index < len; index++) {
      node = data[index];

      if (callback(node, index, data, parent)) {
        find = node;
        break;
      }

      children = node[props.children];

      if (checkValidArray(children)) {
        node = recursive(children, node);

        if (node) {
          find = node;
          break;
        }
      }
    }

    return find;
  }(data, null);
}

export default treeFind;
