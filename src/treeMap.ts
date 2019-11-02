import { checkValidArray } from './utils/checkValidArray';
import { TreeDataProps, TreeEachCallback } from './common';

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
export default function treeMap<T, R>(
  data: T[],
  callback: TreeEachCallback<R, T>,
  props: TreeDataProps = { children: 'children' }
): R[] {
  const propsChildren = props.children;
  let children: T[];

  return (function recursive(data, parent): R[] {
    return data.map((node, index, arr) => {
      const newItem: R = callback(node, index, arr, parent);
      children = newItem[propsChildren];
      if (checkValidArray(children)) {
        newItem[propsChildren] = recursive(children, newItem);
      }
      return newItem;
    });
  })(data);
}
