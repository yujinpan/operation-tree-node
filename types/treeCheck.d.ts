import { TreeDataProps } from './common';
/**
 * tree node check(all associated node)
 *
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
export default function treeCheck<T, K>(
  data: T[],
  checkIds: K[],
  props?: TreeDataProps
): K[];
