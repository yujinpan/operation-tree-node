import treeAppendParent from '@/treeAppendParent';
import treeNodeLevel from '@/treeNodeLevel';
import treeEach from './treeEach';

export type TreeDataAppendLevel<
  Node,
  Children extends string = 'children',
  Parent extends string = 'parent',
  Level extends string = 'level'
> = Omit<Node, Children> & {
  [P in Children]?: TreeDataAppendLevel<Node, Children, Parent, Level>[];
} & {
  [P in Parent]?: TreeDataAppendLevel<Node, Children, Parent, Level>;
} & {
  [P in Level]?: number;
};

/**
 * append `level` to each tree node
 * @description the `level` is a non-enumerable property, and the method will change the source
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 *
 * treeAppendLevel(treeData);
 * console.log(treeData);
 * // [{ id: 1, name: '1', level: 0, children: [{ id: 2, name: '2', level: 1 }] }]
 */
export default function treeAppendLevel<
  T extends object,
  C extends string = 'children',
  P extends string = 'parent',
  L extends string = 'level',
  R extends TreeDataAppendLevel<T, C, P, L> = TreeDataAppendLevel<T, C, P, L>
>(data: T[], props: { children?: C; parent?: P; level?: L } = {}): R[] {
  const propsLevel = props.level || 'level';

  treeAppendParent(data, props);

  treeEach(
    data,
    (node) => {
      Object.defineProperty(node, propsLevel, {
        value: treeNodeLevel(node),
        configurable: true,
        writable: true,
        enumerable: false,
      });
    },
    props
  );
  // @ts-ignore
  return data;
}
