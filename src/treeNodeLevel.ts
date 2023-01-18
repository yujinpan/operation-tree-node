import treeEachParent from '@/treeEachParent';
import { TreeDataProps } from '@/types';

/**
 * get tree node level
 * @description the method needs `parent` link, and level start with 0
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * // link parent
 * treeAppendParent(treeData);
 *
 * const level = treeNodeLevel(treeData[0]); // 0
 * const level = treeNodeLevel(treeData[0].children[0]); // 1
 */
export default function treeNodeLevel<T>(
  treeNode: T,
  props: TreeDataProps = {}
): number {
  let level = 0;
  treeEachParent(
    [treeNode],
    () => {
      level++;
    },
    props
  );
  return level;
}
