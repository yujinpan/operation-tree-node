import { treeSort } from '@/index';

describe('[treeSort]:', () => {
  it("tree node sort by id, and does's change source data", () => {
    const treeData = [
      {
        id: 1,
        name: '1',
        children: [{ id: 3, name: '3' }, { id: 2, name: '2' }]
      }
    ];
    // 1,3,2 => 1,2,3
    const newData = treeSort(
      treeData,
      (currentNode, nextNode) => currentNode.id - nextNode.id
    );
    expect(newData).toEqual([
      {
        id: 1,
        name: '1',
        children: [{ id: 2, name: '2' }, { id: 3, name: '3' }]
      }
    ]);

    // source is not change
    expect(treeData).toEqual([
      {
        id: 1,
        name: '1',
        children: [{ id: 3, name: '3' }, { id: 2, name: '2' }]
      }
    ]);
  });

  it('tree node sort by id use props', () => {
    const treeData = [
      {
        id: 2,
        name: '2',
        child: [{ id: 4, name: '4' }, { id: 3, name: '3' }]
      },
      {
        id: 1,
        name: '1'
      }
    ];

    // 2,1,4,3 => 1,2,3,4
    const newData = treeSort(
      treeData,
      (currentNode, nextNode) => currentNode.id - nextNode.id,
      { children: 'child' }
    );
    expect(newData).toEqual([
      {
        id: 1,
        name: '1'
      },
      {
        id: 2,
        name: '2',
        child: [{ id: 3, name: '3' }, { id: 4, name: '4' }]
      }
    ]);

    // 2,1,4,3 => 2,1,4,3
    const newData2 = treeSort(
      treeData,
      (currentNode, nextNode) => -currentNode.id + nextNode.id,
      { children: 'child' }
    );
    expect(newData2).toEqual([
      {
        id: 2,
        name: '2',
        child: [{ id: 4, name: '4' }, { id: 3, name: '3' }]
      },
      {
        id: 1,
        name: '1'
      }
    ]);
  });
});
