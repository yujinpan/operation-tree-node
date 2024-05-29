import { treeMerge } from '@/index';

describe('[treeMerge]:', () => {
  it("merge tree node's type is same", () => {
    const treeData = [
      { id: 1, name: '1', type: '1', children: [{ id: 2, name: '2' }] },
      { id: 3, name: '3', type: '1', children: [{ id: 4, name: '4' }] }
    ];
    const result = treeMerge(
      treeData,
      (curr, next) => curr.type && curr.type === next.type
    );
    expect(result).toEqual([
      {
        id: 1,
        name: '1',
        type: '1',
        children: [{ id: 2, name: '2' }, { id: 4, name: '4' }]
      }
    ]);
  });

  it("merge tree node's type is same use props and multi node", () => {
    const treeData = [
      {
        id: 1,
        name: '1',
        type: '1',
        child: [{ id: 2, name: '2', type: '2', child: [{ id: 5, name: '5' }] }]
      },
      {
        id: 3,
        name: '3',
        type: '1',
        child: [{ id: 4, name: '4', type: '2', child: [{ id: 6, name: '6' }] }]
      }
    ];
    const result = treeMerge(
      treeData,
      (curr, next) => curr.type && curr.type === next.type,
      { children: 'child' }
    );
    expect(result).toEqual([
      {
        id: 1,
        name: '1',
        type: '1',
        child: [
          {
            id: 2,
            name: '2',
            type: '2',
            child: [{ id: 5, name: '5' }, { id: 6, name: '6' }]
          }
        ]
      }
    ]);
    expect(treeData).toEqual([
      {
        id: 1,
        name: '1',
        type: '1',
        child: [{ id: 2, name: '2', type: '2', child: [{ id: 5, name: '5' }] }]
      },
      {
        id: 3,
        name: '3',
        type: '1',
        child: [{ id: 4, name: '4', type: '2', child: [{ id: 6, name: '6' }] }]
      }
    ]);
  });
});
