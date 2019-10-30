/*!
 * operation-tree-node v1.0.0
 * (c) 2019-2019 yujinpan
 * Released under the MIT License.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkValidArray(data) {
  return !!(Array.isArray(data) && data.length);
}

var defaultTreeDataProps = {
  children: 'children',
  parent: 'parent'
};

/**
 * tree node each
 *
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
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
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultTreeDataProps;
  var children;

  (function recursive(data, parent) {
    data.forEach(function (node, index, arr) {
      children = node[props.children];
      callback(node, index, arr, parent);

      if (checkValidArray(children)) {
        recursive(children, node);
      }
    });
  })(data, null);
}

/**
 * tree node map
 *
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
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
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultTreeDataProps;
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
 * tree node filter
 *
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '1', child: [{ id: 2, name: '2' }] },
 *   { id: 3, name: '3' }
 * ];
 * const result = treeFilter(treeData, (node) => node.id === 2, {
 *   children: 'child'
 * });
 * console.log(result);
 * // [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }]
 */

function treeFilter(data, callback) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultTreeDataProps;
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
 *
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
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
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultTreeDataProps;
  var result = [];
  treeEach(data, function () {
    result.push(callback.apply(void 0, arguments));
  }, props);
  return result;
}

/**
 * tree node merge(level)
 *
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '1', type: '1', children: [{ id: 2, name: '2' }] },
 *   { id: 3, name: '3', type: '1', children: [{ id: 4, name: '4' }] }
 * ];
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
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultTreeDataProps;
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

export { treeEach, treeFilter, treeMap, treeMerge, treeToFlatArray };
