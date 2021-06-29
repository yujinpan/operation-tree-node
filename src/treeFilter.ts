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
  let children: T[];

  return (function recursive(data, parent?: T): T[] {
    const result: T[] = [];
    let newItem: T, newItemChildren: T[], hasChildren: boolean;

    if (isStrictly) {
      data.forEach((node, index, arr) => {
        if (callback(node, index, arr, parent)) {
          newItem = copy(node);
          children = node[propsChildren];
          if (checkValidArray(children)) {
            newItemChildren = recursive(children, newItem);
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
        hasChildren = false;
        newItem = copy(node);
        children = node[propsChildren];
        if (checkValidArray(children)) {
          newItemChildren = recursive(children, newItem);
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
