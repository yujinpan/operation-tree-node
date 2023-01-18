export interface TreeDataProps {
  children?: string;
  parent?: string;
  id?: string | number;
}

export type TreeEachCallback<T, N = T> = (
  node: N,
  index: number,
  arr: N[],
  parent: N | undefined
) => T;

export type TreeData<
  Node,
  Children extends string = 'children',
  Parent extends string = 'parent'
> = Omit<Node, Children> &
  {
    [P in Children]?: TreeData<Node, Children, Parent>[];
  } &
  {
    [P in Parent]?: TreeData<Node, Children, Parent>;
  };
