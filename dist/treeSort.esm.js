/*!
 * operation-tree-node v1.0.4
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkValidArray(data) {
  return !!(Array.isArray(data) && data.length);
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

export default treeSort;
