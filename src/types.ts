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
