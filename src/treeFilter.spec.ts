import { treeFilter } from '@/index';

describe('[treeFilter]:', () => {
  it("get tree node's id is number 2 use props", () => {
    const treeData = [
      { id: 1, name: '1', child: [{ id: 2, name: '2' }] },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 2, {
      children: 'child',
    });
    expect(result).toEqual([
      { id: 1, name: '1', child: [{ id: 2, name: '2' }] },
    ]);
  });

  it("get tree node's id is number 1", () => {
    const treeData = [
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 1);
    expect(result).toEqual([{ id: 1, name: '1' }]);
  });

  it("get tree node's id is number 2", () => {
    const treeData = [
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 2);
    expect(result).toEqual([
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
    ]);
  });

  it("get tree node's id is number 3", () => {
    const treeData = [
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 3);
    expect(result).toEqual([{ id: 3, name: '3' }]);
  });

  it("get tree node's id is number 4", () => {
    const treeData = [
      {
        id: 1,
        name: '1',
        children: [{ id: 2, name: '2', children: [{ id: 4, name: '4' }] }],
      },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 4);
    expect(result).toEqual([
      {
        id: 1,
        name: '1',
        children: [{ id: 2, name: '2', children: [{ id: 4, name: '4' }] }],
      },
    ]);
  });

  it('get none', () => {
    const treeData = [
      {
        id: 1,
        name: '1',
        children: [{ id: 2, name: '2', children: [{ id: 4, name: '4' }] }],
      },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 5);
    expect(result).toEqual([]);
  });

  it('filter with strictly', () => {
    const treeData = [
      {
        id: 1,
        name: '1',
        children: [{ id: 2, name: '2', children: [{ id: 4, name: '4' }] }],
      },
      { id: 3, name: '3' },
    ];
    const result = treeFilter(treeData, (node) => node.id === 1);
    expect(result).toEqual([
      {
        id: 1,
        name: '1',
      },
    ]);
  });
});
