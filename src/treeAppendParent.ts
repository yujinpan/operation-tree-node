import { TreeData } from '@/types';
import treeEach from './treeEach';

/**
 * append `parent` to each tree node
 * @description the `parent` is a non-enumerable property, and the method will change the source
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * treeAppendParent(treeData);
 * console.log(treeData);
 * // [{ id: 1, name: '1', parent: null, children: [{ id: 2, name: '2', parent: {} }] }]
 */
export default function treeAppendParent<
  T extends object,
  C extends string = 'children',
  P extends string = 'parent',
  R extends TreeData<T, C, P> = TreeData<T, C, P>
>(data: T[], props: { children?: C; parent?: P } = {}): R[] {
  const propsParent = props.parent || 'parent';

  treeEach(
    data,
    (node, index, arr, parent) => {
      Object.defineProperty(node, propsParent, {
        value: parent,
        configurable: true,
        writable: true,
        enumerable: false
      });
    },
    props
  );
  // @ts-ignore
  return data;
}
