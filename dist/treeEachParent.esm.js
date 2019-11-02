/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
/**
 * tree node each parent
 * @description recursive will break until callback is false
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '123', children: [{ id: 2, name: '2', parent: null }] }
 * ];
 * treeData[0].children[0].parent = treeData[0];
 * const names: string[] = [];
 * treeEachParent(treeData[0].children, (parent) => !!names.push(parent.name));
 * // console.log(names)
 * // ['123']
 */
function treeEachParent(treeData, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    parent: 'parent'
  };
  var propsParent = props.parent;
  var parent;
  treeData.forEach(function (node) {
    recursive(node);
  });

  function recursive(node) {
    parent = node[propsParent]; // if callback false, skip parent

    if (parent && callback(parent) !== false) {
      recursive(parent);
    }
  }
}

export default treeEachParent;
