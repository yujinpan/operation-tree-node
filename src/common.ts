export type TreeDataProps = {
  children?: string;
  parent?: string;
};
export type TreeEachCallback<T, N = T> = (
  node: N,
  index: number,
  arr: N[],
  parent: N | undefined
) => T;
export const defaultTreeDataProps: TreeDataProps = {
  children: 'children',
  parent: 'parent'
};
