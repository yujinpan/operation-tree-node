import { defaultTreeDataProps, TreeDataProps } from './common';
import treeMap from './treeMap';
import { checkValidArray } from './utils/checkValidArray';

/**
 * tree node sort
 *
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
  props: TreeDataProps = defaultTreeDataProps
): T[] {
  const propsChildren = props.children;
  let children;
  data = [...data].sort(callback);
  return treeMap(
    data,
    (node) => {
      children = node[propsChildren];
      node = { ...node };
      if (checkValidArray(children)) {
        node[propsChildren] = [...node[propsChildren]].sort(callback);
      }
      return node;
    },
    props
  );
}
