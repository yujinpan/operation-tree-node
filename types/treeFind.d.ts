import { TreeDataProps, TreeEachCallback } from './common';
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
export default function treeFind<T>(
  data: T[],
  callback: TreeEachCallback<boolean, T>,
  props?: TreeDataProps
): T | null;
