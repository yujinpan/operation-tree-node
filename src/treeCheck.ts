import { checkValidArray } from './utils/checkValidArray';
import { TreeDataProps } from './common';
import treeEach from './treeEach';
import treeMap from './treeMap';
import treeEachParent from './treeEachParent';

/**
 * tree node check
 * @description get all associated node'id by check one node
 * @example
 *
 * const treeData = [{ id: 1, name: '123', children: [{ id: 2, name: '2' }] }];
 * const resultIds = treeCheck(treeData, [2], {
 *   id: 'id',
 *   children: 'children',
 *   parent: 'parent'
 * });
 * console.log(resultIds)
 * // [2, 1]
 */
export default function treeCheck<T, K>(
  data: T[],
  checkIds: K[],
  props: TreeDataProps = { id: 'id', children: 'children', parent: 'parent' }
): K[] {
  const { children: propsChildren, id: propsId } = props;
  const checkedNodesLevel = [];
  const ids = [];
  const checkNode = (node): void => {
    ids.push(node[propsId]);
    node._checked = true;
  };
  let children;

  // 1. copy tree data
  // 2. create parent reference
  // 3. marked `_checked` false
  const newData = treeMap(
    data,
    (node, index, arr, parent) => ({ ...node, _checked: false, parent }),
    props
  );

  // 1. check children
  // 2. change marked `_checked`
  treeEach(
    newData,
    (node) => {
      if (!node._checked) {
        if (checkIds.includes(node[propsId])) {
          checkNode(node);
          checkedNodesLevel.push(node);
          children = node[propsChildren];
          if (checkValidArray(children)) {
            treeEach(
              children,
              (node) => {
                checkNode(node);
              },
              props
            );
          }
        }
      } else {
        // skip children
        return false;
      }
    },
    props
  );

  // 1. check parent
  treeEachParent(
    checkedNodesLevel,
    (node) => {
      if (!node._checked) {
        const childrenLen = node[propsChildren].length;

        // if only 1
        if (childrenLen === 1) {
          checkNode(node);
        }
        // else checking all children
        else {
          const count = node._checkedCount || 0;
          node._checkedCount = count + 1;
          if (node._checkedCount === childrenLen) {
            checkNode(node);
          }
        }
      } else {
        // skip parent
        return false;
      }
    },
    props
  );

  return ids;
}
