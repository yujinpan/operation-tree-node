import { TreeDataProps } from './types';

/**
 * tree node find parent
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '123', children: [{ id: 2, name: '2', parent: null }] }
 * ];
 * treeData[0].children[0].parent = treeData[0];
 * const find = treeFindParent(treeData[0].children[0], (node) => node.id === 1);
 * console.log(find)
 * // { id: 1, name: '123', children: ... }
 */
export default function treeFindParent<T>(
  treeNode: T,
  callback: (node: T) => boolean,
  props: TreeDataProps = {}
): T {
  const propsParent = props.parent || 'parent';

  return recursive(treeNode);

  function recursive(node): T {
    if (callback(node)) return node;

    const parent = node[propsParent];
    return parent ? recursive(parent) : null;
  }
}
