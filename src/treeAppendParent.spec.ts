import treeAppendParent from './treeAppendParent';

describe('[treeAppendParent]:', () => {
  it('should append parent property', () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
    const appendParentData = treeAppendParent(treeData);

    expect(appendParentData[0].parent).toBe(null);
    expect(appendParentData[0].children[0].parent).toBe(appendParentData[0]);
  });

  it('should use custom props', () => {
    const treeData = [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }];
    const appendParentData = treeAppendParent(treeData, {
      children: 'child',
      parent: 'p'
    });

    expect(appendParentData[0].p).toBe(null);
    expect(appendParentData[0].child[0].p).toBe(appendParentData[0]);
  });
});
