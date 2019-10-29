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

export { default as treeEach } from './treeEach';
export { default as treeMap } from './treeMap';
export { default as treeFilter } from './treeFilter';
export { default as treeToFlatArray } from './treeToFlatArray';
