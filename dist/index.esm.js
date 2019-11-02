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

/**
 * tree node map(like Array.prototype.map)
 * @description get a new data instead of change source
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * // tree node's +1
 * const newData = treeMap(treeData, (node) => ({
 *  id: node.id + 1,
 *  name: node.name,
 *  ...(node.children ? { children: node.children } : {})
 * }));
 * console.log(newData);
 * // [{ id: 2, name: '1', children: [{ id: 3, name: '2' }] }]
 */
function treeMap(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: 'children'
  };
  var propsChildren = props.children;
  var children;
  return function recursive(data, parent) {
    return data.map(function (node, index, arr) {
      var newItem = callback(node, index, arr, parent);
      children = newItem[propsChildren];

      if (checkValidArray(children)) {
        newItem[propsChildren] = recursive(children, newItem);
      }

      return newItem;
    });
  }(data);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * tree node filter(like Array.prototype.filter)
 * @description get a new data instead of change source
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '1', child: [{ id: 2, name: '2' }] },
 *   { id: 3, name: '3' }
 * ];
 *
 * const result = treeFilter(treeData, (node) => node.id === 2, {
 *   children: 'child'
 * });
 * console.log(result);
 * // [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }]
 */
function treeFilter(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: 'children'
  };
  var propsChildren = props.children;
  var children;
  return function recursive(data, parent) {
    var result = [];
    var newItem, newItemChildren, hasChildren;
    data.forEach(function (node, index, arr) {
      hasChildren = false;
      newItem = _objectSpread2({}, node);
      children = node[propsChildren];

      if (checkValidArray(children)) {
        newItemChildren = recursive(children, newItem);

        if (hasChildren = checkValidArray(newItemChildren)) {
          newItem[propsChildren] = newItemChildren;
        } else {
          delete newItem[propsChildren];
        }
      }

      if (callback(node, index, arr, parent) || hasChildren) {
        result.push(newItem);
      }
    });
    return result;
  }(data);
}

/**
 * tree to flat array
 * @description get a flat array and source data structure is not change
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * const result = treeToFlatArray(treeData);
 * console.log(result);
 * // [
 * //   { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
 * //   { id: 2, name: '2' }
 * // ]
 */
function treeToFlatArray(data) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (node) {
    return node;
  };
  var props = arguments.length > 2 ? arguments[2] : undefined;
  var result = [];
  treeEach(data, function () {
    result.push(callback.apply(void 0, arguments));
  }, props);
  return result;
}

/**
 * tree node merge(same level)
 * @description get a new data instead of change source
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '1', type: '1', children: [{ id: 2, name: '2' }] },
 *   { id: 3, name: '3', type: '1', children: [{ id: 4, name: '4' }] }
 * ];
 *
 * const result = treeMerge(
 *   treeData,
 *   (curr, next) => curr.type && curr.type === next.type
 * );
 * console.log(result)
 * // [
 * //   {
 * //     id: 1,
 * //     name: '1',
 * //     type: '1',
 * //     children: [{ id: 2, name: '2' }, { id: 4, name: '4' }]
 * //   }
 * // ]
 */
function treeMerge(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: 'children'
  };
  var propsChildren = props.children;
  var children, commonChildren, newItem;
  return function recursive(data) {
    var result = [];
    data.forEach(function (node) {
      var common = result.find(function (item) {
        return callback(item, node);
      });
      children = node[propsChildren];

      if (common) {
        commonChildren = common[propsChildren];

        if (checkValidArray(children)) {
          if (checkValidArray(commonChildren)) {
            common[propsChildren] = recursive([].concat(_toConsumableArray(commonChildren), _toConsumableArray(children)));
          } else {
            common[propsChildren] = recursive(children);
          }
        }
      } else {
        newItem = _objectSpread2({}, node);

        if (checkValidArray(children)) {
          newItem[propsChildren] = _toConsumableArray(children);
        }

        result.push(newItem);
      }
    });
    return result;
  }(data);
}

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

/**
 * tree node sort(like Array.prototype.sort)
 * @description get a new data instead of change source
 * @example
 *
 * const treeData = [
 *   {
 *     id: 1,
 *     name: '1',
 *     children: [{ id: 3, name: '3' }, { id: 2, name: '2' }]
 *   }
 * ];
 *
 * // 1,3,2 => 1,2,3
 * const newData = treeSort(
 *   treeData,
 *   (currentNode, nextNode) => currentNode.id - nextNode.id
 * );
 * console.log(newData);
 * // [
 * //   {
 * //     id: 1,
 * //     name: '1',
 * //     children: [{ id: 2, name: '2' }, { id: 3, name: '3' }]
 * //   }
 * // ]);
 */

function treeSort(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    children: 'children'
  };
  var propsChildren = props.children;
  var children;
  data = _toConsumableArray(data).sort(callback);
  return treeMap(data, function (node) {
    children = node[propsChildren];
    node = _objectSpread2({}, node);

    if (checkValidArray(children)) {
      node[propsChildren] = _toConsumableArray(node[propsChildren]).sort(callback);
    }

    return node;
  }, props);
}

/**
 * tree node check
 * @description get all associated node'id by check one node
 * @example
 *
 * const treeData = [{ id: 1, name: '123', children: [{ id: 2, name: '2' }] }];
 * const resultIds = treeCheck(treeData, [2], {
 *   id: 'id',
 *   children: 'children',
 *   parent: 'parent'
 * });
 * console.log(resultIds)
 * // [2, 1]
 */

function treeCheck(data, checkIds) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    id: 'id',
    children: 'children',
    parent: 'parent'
  };
  var propsChildren = props.children,
      propsId = props.id;
  var checkedNodesLevel = [];
  var ids = [];

  var checkNode = function checkNode(node) {
    ids.push(node[propsId]);
    node._checked = true;
  };

  var children; // 1. copy tree data
  // 2. create parent reference
  // 3. marked `_checked` false

  var newData = treeMap(data, function (node, index, arr, parent) {
    return _objectSpread2({}, node, {
      _checked: false,
      parent: parent
    });
  }, props); // 1. check children
  // 2. change marked `_checked`

  treeEach(newData, function (node) {
    if (!node._checked) {
      if (checkIds.includes(node[propsId])) {
        checkNode(node);
        checkedNodesLevel.push(node);
        children = node[propsChildren];

        if (checkValidArray(children)) {
          treeEach(children, function (node) {
            checkNode(node);
          }, props);
        }
      }
    } else {
      // skip children
      return false;
    }
  }, props); // 1. check parent

  treeEachParent(checkedNodesLevel, function (node) {
    if (!node._checked) {
      var childrenLen = node[propsChildren].length; // if only 1

      if (childrenLen === 1) {
        checkNode(node);
      } // else checking all children
      else {
          var count = node._checkedCount || 0;
          node._checkedCount = count + 1;

          if (node._checkedCount === childrenLen) {
            checkNode(node);
          }
        }
    } else {
      // skip parent
      return false;
    }
  }, props);
  return ids;
}

export { treeCheck, treeEach, treeEachParent, treeFilter, treeFind, treeMap, treeMerge, treeSort, treeToFlatArray };
