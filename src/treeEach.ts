import { checkValidArray } from './utils/checkValidArray';
import {
  defaultTreeDataProps,
  TreeDataProps,
  TreeEachCallback
} from './common';

/**
 * tree node each
 *
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
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
  callback: TreeEachCallback<void, T>,
  props: TreeDataProps = defaultTreeDataProps
): void {
  let children: T[];

  (function recursive(data, parent): void {
    data.forEach((node, index, arr) => {
      children = node[props.children];

      callback(node, index, arr, parent);

      if (checkValidArray(children)) {
        recursive(children, node);
      }
    });
  })(data, null);
}
