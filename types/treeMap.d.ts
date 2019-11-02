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
  props?: TreeDataProps
): R[];
