import { checkValidArray } from './utils/checkValidArray';
import { TreeDataProps } from './types';

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
  props: TreeDataProps = {}
): T[] {
  const propsChildren = props.children || 'children';

  return (function recursive(data): T[] {
    const result: T[] = [];

    data.forEach((node) => {
      const common = result.find((item) => callback(item, node));
      const children = node[propsChildren];
      if (common) {
        const commonChildren = common[propsChildren];
        if (checkValidArray(children)) {
          if (checkValidArray(commonChildren)) {
            common[propsChildren] = recursive([...commonChildren, ...children]);
          } else {
            common[propsChildren] = recursive(children);
          }
        }
      } else {
        const newItem = { ...node };
        if (checkValidArray(children)) {
          newItem[propsChildren] = [...children];
        }
        result.push(newItem);
      }
    });

    return result;
  })(data);
}
