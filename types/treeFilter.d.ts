import { TreeDataProps, TreeEachCallback } from './index';
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
export default function treeFilter<T>(
  data: T[],
  callback: TreeEachCallback<boolean, T>,
  props?: TreeDataProps
): T[];
