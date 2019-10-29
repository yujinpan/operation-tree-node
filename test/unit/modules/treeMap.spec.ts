import { treeMap } from 'src';

describe('[treeMap]:', () => {
  it("change all tree node's id to +1, and return new tree data", () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
    const newData = treeMap(treeData, (node) => ({
      id: node.id + 1,
      name: node.name,
      ...(node.children ? { children: node.children } : {})
    }));
    expect(newData).toEqual([
      {
        id: 2,
        name: '1',
        children: [{ id: 3, name: '2' }]
      }
    ]);

    // source is not change
    expect(treeData).toEqual([
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] }
    ]);
  });

  it("change all tree node's id to +1 use props, and return new tree data", () => {
    const treeData = [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }];
    const newData = treeMap(
      treeData,
      (node) => ({
        id: node.id + 1,
        name: node.name,
        ...(node.child ? { child: node.child } : {})
      }),
      { children: 'child' }
    );
    expect(newData).toEqual([
      {
        id: 2,
        name: '1',
        child: [{ id: 3, name: '2' }]
      }
    ]);

    // source is not change
    expect(treeData).toEqual([
      { id: 1, name: '1', child: [{ id: 2, name: '2' }] }
    ]);
  });
});
