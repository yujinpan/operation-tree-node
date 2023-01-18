import { checkValidArray } from './utils/checkValidArray';
import { TreeDataProps, TreeEachCallback } from './types';

/**
 * tree node filter(like Array.prototype.filter)
 * @description get a new data instead of change source
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '1', child: [{ id: 2, name: '2' }] },
 *   { id: 3, name: '3' }
 * ];
 *
 * const result = treeFilter(treeData, (node) => node.id === 2, {
 *   children: 'child'
 * });
 * console.log(result);
 * // [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }]
 */
export default function treeFilter<T extends Record<string, any>>(
  data: T[],
  callback: TreeEachCallback<boolean, T>,
  props: TreeDataProps = {},
  isStrictly = false
): T[] {
  const propsChildren = props.children || 'children';

  return (function recursive(data, parent?: T): T[] {
    const result: T[] = [];

    if (isStrictly) {
      data.forEach((node, index, arr) => {
        if (callback(node, index, arr, parent)) {
          const newItem = copy(node);
          const children = node[propsChildren];
          if (checkValidArray(children)) {
            const newItemChildren = recursive(children, newItem);
            if (checkValidArray(newItemChildren)) {
              // @ts-ignore
              newItem[propsChildren] = newItemChildren;
            } else {
              delete newItem[propsChildren];
            }
          }
          result.push(newItem);
        }
      });
    } else {
      data.forEach((node, index, arr) => {
        let hasChildren = false;
        const newItem = copy(node);
        const children = node[propsChildren];
        if (checkValidArray(children)) {
          const newItemChildren = recursive(children, newItem);
          if ((hasChildren = checkValidArray(newItemChildren))) {
            // @ts-ignore
            newItem[propsChildren] = newItemChildren;
          } else {
            delete newItem[propsChildren];
          }
        }
        if (callback(node, index, arr, parent) || hasChildren) {
          result.push(newItem);
        }
      });
    }
    return result;
  })(data);
}

function copy<T>(val: T): T {
  return val instanceof Object
    ? { ...val }
    : Array.isArray(val)
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      ([...val] as T)
    : val;
}
