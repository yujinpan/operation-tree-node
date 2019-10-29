Operation method collection for tree node(like operation array).

## Usage

- Install

```
npm install --save operation-tree
```

## Methods

common arguments:

| name     | type                                      | description                                                                                    |
| -------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| data     | object[]                                  | example: [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }]                              |
| callback | (node, index, arr, parent) => object/void | node: tree node, index: parent children's index,<br> arr: parent children, parent: parent node |
| props    | { children: string, parent: string }      | tree node's 'children' and 'parent' name                                                       |

examples:

- treeEach(data, callback, props) tree node each

```js
import { treeEach } from "operation-tree";

const treeData1 = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];
treeEach(treeData1, (node, index, arr, parent) => {
  console.log(node.name, index, arr, parent);
});
// '1', 0, [treeData], undefined
// '2', 0, [treeData[0].children], [treeData[0]]

// use children props
const treeData2 = [{ id: 1, name: "1", child: [{ id: 2, name: "2" }] }];
treeEach(treeData2, console.log, { children: "child" });
```

- treeMap(data, callback, props) tree node map

```js
import { treeMap } from "operation-tree";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];
// tree node's +1
const newData = treeMap(treeData, node => ({
  id: node.id + 1,
  name: node.name,
  ...(node.children ? { children: node.children } : {})
}));
console.log(newData);
// [{ id: 2, name: '1', children: [{ id: 3, name: '2' }] }]
```

- treeFilter(data, callback, props) tree node filter

```js
import { treeFilter } from "operation-tree";

const treeData = [
  { id: 1, name: "1", child: [{ id: 2, name: "2" }] },
  { id: 3, name: "3" }
];
const result = treeFilter(treeData, node => node.id === 2, {
  children: "child"
});
console.log(result);
// [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }]
```

- treeToFlatArray(data, callback, props) tree to flat array

```js
import { treeToFlatArray } from "operation-tree";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];
const result = treeToFlatArray(treeData);
console.log(result);
// [
//   { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
//   { id: 2, name: '2' }
// ]
```

- treeMerge（data, callback, props) tree node merge(level)

arguments:

| name     | type                               | description                                        |
| -------- | ---------------------------------- | -------------------------------------------------- |
| data     | (same)                             | (same)                                             |
| callback | (currentNode, nextNode) => boolean | currentNode/nextNode: tree node, compare with them |
| props    | (same)                             | (same)                                             |

```js
import { treeMerge } from "operation-tree";

const treeData = [
  { id: 1, name: "1", type: "1", children: [{ id: 2, name: "2" }] },
  { id: 3, name: "3", type: "1", children: [{ id: 4, name: "4" }] }
];
const result = treeMerge(
  treeData,
  (curr, next) => curr.type && curr.type === next.type
);
console.log(result);
// [
//   {
//     id: 1,
//     name: '1',
//     type: '1',
//     children: [{ id: 2, name: '2' }, { id: 4, name: '4' }]
//   }
// ]
```

- treeSort（developing)
