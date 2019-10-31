import { treeEachParent } from 'src';

describe('[treeEachParent]:', () => {
  it('get all parent name', () => {
    const treeData = [
      { id: 1, name: '123', children: [{ id: 2, name: '2', parent: null }] }
    ];
    treeData[0].children[0].parent = treeData[0];
    const names: string[] = [];
    treeEachParent(treeData[0].children, (parent) => !!names.push(parent.name));
    expect(names).toEqual(['123']);
  });

  it('get all parent name use `props`', () => {
    const treeData = [
      { id: 1, name: '123', child: [{ id: 2, name: '2', p: null }] }
    ];
    treeData[0].child[0].p = treeData[0];
    const names: string[] = [];
    treeEachParent(treeData[0].child, (parent) => !!names.push(parent.name), {
      parent: 'p'
    });
    expect(names).toEqual(['123']);
  });
});
