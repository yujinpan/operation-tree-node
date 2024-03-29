import { checkValidArray } from './utils/checkValidArray';
import { TreeDataProps, TreeEachCallback } from './types';

/**
 * tree node each(like Array.prototype.forEach)
 * @description recursive will break until callback is false
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * treeEach(treeData, (node, index, arr, parent) => {
 *   console.log(node.name, index, arr, parent);
 * });
 * // '1', 0, [treeData], undefined
 * // '2', 0, [treeData[0].children], [treeData[0]]
 *
 * // use children props
 * const treeData = [{ id: 1, name: '1', child: [...] }];
 * treeEach(treeData, () => {...}, { children: 'child' });
 */
export default function treeEach<T>(
  data: T[],
  callback: TreeEachCallback<any, T>,
  props: TreeDataProps = {}
): void {
  const propsChildren = props.children || 'children';

  (function recursive(data, parent): void {
    data.forEach((node, index, arr) => {
      const children = node[propsChildren];

      // if callback false, skip children
      if (
        callback(node, index, arr, parent) !== false &&
        checkValidArray(children)
      ) {
        recursive(children, node);
      }
    });
  })(data, null);
}
