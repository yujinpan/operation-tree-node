import { TreeDataProps } from './types';

/**
 * tree node each parent
 * @description recursive will break until callback is false
 * @example
 *
 * const treeData = [
 *   { id: 1, name: '123', children: [{ id: 2, name: '2', parent: null }] }
 * ];
 * treeData[0].children[0].parent = treeData[0];
 * const names: string[] = [];
 * treeEachParent(treeData[0].children, (parent) => !!names.push(parent.name));
 * // console.log(names)
 * // ['123']
 */
export default function treeEachParent<T>(
  treeData: T[],
  callback: (node: T) => void | boolean,
  props: TreeDataProps = {}
): void {
  const propsParent = props.parent || 'parent';

  treeData.forEach((node) => {
    recursive(node);
  });

  function recursive(node): void {
    const parent = node[propsParent];

    // if callback false, skip parent
    if (parent && callback(parent) !== false) {
      recursive(parent);
    }
  }
}
