import { TreeDataProps, TreeEachCallback } from './common';
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
export default function treeToFlatArray<T, R>(
  data: T[],
  callback: TreeEachCallback<T | R, T>,
  props: TreeDataProps
): Array<T | R>;
