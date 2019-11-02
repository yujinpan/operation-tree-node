import { TreeDataProps } from './common';
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
export default function treeMerge<T>(
  data: T[],
  callback: (currentNode: T, nextNode: T) => boolean,
  props?: TreeDataProps
): T[];
