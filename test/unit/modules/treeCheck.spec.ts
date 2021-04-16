import { treeCheck } from '@/index';

describe('[treeEachParent]:', () => {
  it('check node id 1', () => {
    const treeData = [{ id: 1, name: '123', children: [{ id: 2, name: '2' }] }];
    const resultIds = treeCheck(treeData, [1], {
      id: 'id',
      children: 'children',
      parent: 'parent'
    });
    expect(resultIds).toEqual([1, 2]);
  });

  it('check node id 2', () => {
    const treeData = [{ id: 1, name: '123', children: [{ id: 2, name: '2' }] }];
    const resultIds = treeCheck(treeData, [2], {
      id: 'id',
      children: 'children',
      parent: 'parent'
    });
    expect(resultIds).toEqual([2, 1]);
  });

  it('check node id 3', () => {
    const treeData = [
      {
        id: 1,
        name: '123',
        children: [{ id: 2, name: '2' }, { id: 3, name: '3' }]
      }
    ];
    const resultIds = treeCheck(treeData, [3], {
      id: 'id',
      children: 'children',
      parent: 'parent'
    });
    expect(resultIds).toEqual([3]);
  });

  it('check node id 3 and 2', () => {
    const treeData = [
      {
        id: 1,
        name: '123',
        children: [{ id: 2, name: '2' }, { id: 3, name: '3' }]
      }
    ];
    const resultIds = treeCheck(treeData, [3, 2], {
      id: 'id',
      children: 'children',
      parent: 'parent'
    });
    expect(resultIds).toEqual([2, 3, 1]);
  });
});
