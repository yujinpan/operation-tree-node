import treeEach from './treeEach';
import { defaultTreeDataProps, TreeDataProps, TreeEachCallback } from './index';

/**
 * tree to flat array
 *
 * @example
 *
 * const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
 * const result = treeToFlatArray(treeData);
 * console.log(result);
 * // [
 * //   { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
 * //   { id: 2, name: '2' }
 * // ]
 */
export default function treeToFlatArray<T, R>(
  data: T[],
  callback: TreeEachCallback<T | R, T> = (node): T | R => node,
  props: TreeDataProps = defaultTreeDataProps
): Array<T | R> {
  const result: Array<T | R> = [];
  treeEach(
    data,
    (...params) => {
      result.push(callback(...params));
    },
    props
  );
  return result;
}
