import { TreeDataProps } from './common';
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
export default function treeSort<T>(
  data: T[],
  callback: (currentNode: T, nextNode: T) => number,
  props?: TreeDataProps
): T[];
