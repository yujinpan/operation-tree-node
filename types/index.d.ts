export declare type TreeDataProps = {
  children?: string;
  parent?: string;
};
export declare type TreeEachCallback<T, N = T> = (
  node: N,
  index: number,
  arr: N[],
  parent: N | undefined
) => T;
export declare const defaultTreeDataProps: TreeDataProps;
export { default as treeEach } from './treeEach';
export { default as treeMap } from './treeMap';
export { default as treeFilter } from './treeFilter';
export { default as treeToFlatArray } from './treeToFlatArray';
