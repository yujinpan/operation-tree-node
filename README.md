Operation method collection for tree node(like operation array).

## Usage

- Install

```
npm install --save operation-tree-node
```

## API

- [Base](#base)
  - [treeEach: each tree nodes](#treeeach)
  - [treeFilter: filter tree nodes](#treefilter)
  - [treeMap: replace tree node](#treemap)
  - [treeFind: find tree node](#treefind)
  - [treeToFlatArray: to flat array](#treetoflatarray)
- [Advance](#advance)
  - [treeSort: sort tree nodes](#treesort)
  - [treeCheck: check tree nodes](#treecheck)
  - [treeEachParent: parent node each](#treeeachparent)
  - [treeFindParent: find node parent](#treefindparent)
  - [treeMerge: merge same nodes](#treemerge)
  - [treeAppendParent: append parent link](#treeappendparent)
  - [treeAppendLevel: append tree node level](#treeappendlevel)
  - [treeNodeLevel: get node level](#treenodelevel)

common arguments:

| name       | type                                                | description                                                                                    |
| ---------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `data`     | `object[]`                                          | example: `[{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }]`                            |
| `callback` | `(node, index, arr, parent) => boolean/object/void` | node: tree node, index: parent children's index,<br> arr: parent children, parent: parent node |
| `props`    | `{ id: string, children: string, parent: string }`  | tree node's 'children', 'parent' and 'id' key name                                             |

### Base

### treeEach

`treeEach(data, callback, props)` tree node each(like `Array.prototype.forEach`).

recursive will break until callback is false.

```js
import { treeEach } from "operation-tree-node";

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

### treeFilter

`treeFilter(data, callback, props, isStrictly)` tree node filter(like `Array.prototype.filter`).

get a new data instead of change source.

```js
import { treeFilter } from "operation-tree-node";

const treeData = [
  { id: 1, name: "1", child: [{ id: 2, name: "2" }] },
  { id: 3, name: "3" },
];

const result = treeFilter(treeData, (node) => node.id === 2, {
  children: "child",
});
console.log(result);
// [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }]
```

### treeMap

`treeMap(data, callback, props)` tree node map(like `Array.prototype.map`).

get a new data instead of change source.

```js
import { treeMap } from "operation-tree-node";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];

// tree node's +1
const newData = treeMap(treeData, (node) => ({
  id: node.id + 1,
  name: node.name,
  ...(node.children ? { children: node.children } : {}),
}));
console.log(newData);
// [{ id: 2, name: '1', children: [{ id: 3, name: '2' }] }]
```

### treeFind

`treeFind(data, callback, props)` tree node find(like `Array.prototype.find`).

recursive will break until found.

```js
import { treeFind } from "operation-tree-node";

const treeData = [
  { id: 1, name: "1", children: [{ id: 2, name: "2" }] },
  { id: 1, name: "1", children: [{ id: 2, name: "2" }] },
];

const find = treeFind(treeData, (node) => node.id === 2);
console.log(find);
// { id: 2, name: '2' }
```

### treeToFlatArray

`treeToFlatArray(data, callback, props)` tree to flat array.

get a flat array and source data structure is not change.

```js
import { treeToFlatArray } from "operation-tree-node";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];

const result = treeToFlatArray(treeData);
console.log(result);
// [
//   { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
//   { id: 2, name: '2' }
// ]
```

### Advance

### treeSort

`treeSort(data, callback, props)` tree node sort(like `Array.prototype.sort`).

get a new data instead of change source.

| name       | type                                | description                                        |
| ---------- | ----------------------------------- | -------------------------------------------------- |
| `data`     | (same)                              | (same)                                             |
| `callback` | `(currentNode, nextNode) => number` | currentNode/nextNode: tree node, compare with them |
| `props`    | (same)                              | (same)                                             |

```js
const treeData = [
  {
    id: 1,
    name: "1",
    children: [
      { id: 3, name: "3" },
      { id: 2, name: "2" },
    ],
  },
];

// 1,3,2 => 1,2,3
const newData = treeSort(
  treeData,
  (currentNode, nextNode) => currentNode.id - nextNode.id
);
console.log(newData);
// [
//   {
//     id: 1,
//     name: '1',
//     children: [{ id: 2, name: '2' }, { id: 3, name: '3' }]
//   }
// ]);
```

### treeCheck

`treeCheck(data, checkIds, props)` tree node check.

get all associated node'id by check one node.

| name       | type                | description           |
| ---------- | ------------------- | --------------------- |
| `data`     | (same)              | (same)                |
| `checkIds` | `number[]/string[]` | will checked node ids |
| `props`    | (same)              | (same)                |

```js
import { treeCheck } from "operation-tree-node";

const treeData = [{ id: 1, name: "123", children: [{ id: 2, name: "2" }] }];
const resultIds = treeCheck(treeData, [2], {
  id: "id",
  children: "children",
  parent: "parent",
});
console.log(resultIds);
// [2, 1]
```

### treeEachParent

`treeEachParent(data, callback, props)` tree node each parent.

recursive will break until callback is false.

| name       | type                       | description                                                |
| ---------- | -------------------------- | ---------------------------------------------------------- |
| `data`     | (same)                     | (same)                                                     |
| `callback` | `(parent) => void/boolean` | parent: parent node, if callback false, skip parent.parent |
| `props`    | (same)                     | (same)                                                     |

```js
import { treeEachParent } from "operation-tree-node";

const treeData = [
  { id: 1, name: "123", children: [{ id: 2, name: "2", parent: null }] },
];
treeData[0].children[0].parent = treeData[0];

const names = [];
treeEachParent(treeData[0].children, (parent) => !!names.push(parent.name));
console.log(names);
// ['123']
```

### treeFindParent

`treeFindParent(node, callback, props)` tree node find parent.

```js
import { treeFindParent } from "operation-tree-node";

const treeData = [
  {
    id: 1,
    name: "123",
    parent: null,
    children: [{ id: 2, name: "2", parent: null, children: [] }],
  },
];
treeData[0].children[0].parent = treeData[0];

const find = treeFindParent(treeData[0].children[0], (node) => node.id === 1);
console.log(find);
// { id: 1, name: '123', children: ... }
```

### treeMerge

`treeMerge（data, callback, props)` tree node merge(same level).

get a new data instead of change source.

| name       | type                                 | description                                        |
| ---------- | ------------------------------------ | -------------------------------------------------- |
| `data`     | (same)                               | (same)                                             |
| `callback` | `(currentNode, nextNode) => boolean` | currentNode/nextNode: tree node, compare with them |
| `props`    | (same)                               | (same)                                             |

```js
import { treeMerge } from "operation-tree-node";

const treeData = [
  { id: 1, name: "1", type: "1", children: [{ id: 2, name: "2" }] },
  { id: 3, name: "3", type: "1", children: [{ id: 4, name: "4" }] },
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

### treeAppendParent

`treeAppendParent(data, props)` append `parent` to each tree node.

the `parent` is a non-enumerable property, and the method will change the source.

```js
import { treeAppendParent } from "operation-tree-node";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];

treeAppendParent(treeData);
console.log(treeData);
// [{ id: 1, name: '1', parent: null, children: [{ id: 2, name: '2', parent: {} }] }]
```

### treeAppendLevel

`treeAppendLevel(data, props)` append `level` to each tree node.

the `level` is a non-enumerable property, and the method will change the source.

```js
import { treeLevelParent } from "operation-tree-node";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];

treeAppendLevel(treeData);
console.log(treeData);
// [{ id: 1, name: '1', level: 0, children: [{ id: 2, name: '2', level: 1 }] }]
```

### treeNodeLevel

`treeNodeLevel(node, props)` get tree node level.

the method needs `parent` link, and level start with 0.

```js
import { treeAppendParent, treeNodeLevel } from "operation-tree-node";

const treeData = [{ id: 1, name: "1", children: [{ id: 2, name: "2" }] }];

// link parent
treeAppendParent(treeData);

const level = treeNodeLevel(treeData[0]); // 0
const level = treeNodeLevel(treeData[0].children[0]); // 1
```
