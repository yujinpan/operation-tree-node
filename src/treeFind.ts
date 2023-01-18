import { checkValidArray } from './utils/checkValidArray';
import { TreeDataProps, TreeEachCallback } from './types';

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
  props: TreeDataProps = {}
): T | null {
  const propsChildren = props.children || 'children';

  return (function recursive(data, parent): T | null {
    const len = data.length;
    let find: T | null = null;
    for (let index = 0; index < len; index++) {
      let node = data[index];
      if (callback(node, index, data, parent)) {
        find = node;
        break;
      }

      const children = node[propsChildren];
      if (checkValidArray(children)) {
        node = recursive(children, node);
        if (node) {
          find = node;
          break;
        }
      }
    }
    return find;
  })(data, null);
}
