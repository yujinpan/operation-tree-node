import { treeFindParent } from '@/index';

describe('[treeEachParent]:', () => {
  const treeData = [
    {
      id: 1,
      name: '123',
      parent: null,
      children: [{ id: 2, name: '2', parent: null, children: [] }]
    }
  ];
  treeData[0].children[0].parent = treeData[0];

  it('find parent', () => {
    const find = treeFindParent(
      treeData[0].children[0],
      (node) => node.id === 1
    );
    expect(find).toEqual(treeData[0]);
  });

  it('not found will return null', () => {
    const find = treeFindParent(
      treeData[0].children[0],
      (node) => node.id === 3
    );
    expect(find).toEqual(null);
  });
});
