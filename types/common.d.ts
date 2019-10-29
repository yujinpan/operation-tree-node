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
