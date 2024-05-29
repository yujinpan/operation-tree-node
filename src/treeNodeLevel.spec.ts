import treeAppendParent from './treeAppendParent';
import treeNodeLevel from './treeNodeLevel';

describe('[treeNodeLevel]:', () => {
  it('should get tree node level', () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];

    // link parent
    treeAppendParent(treeData);

    expect(treeNodeLevel(treeData[0])).toBe(0);
    expect(treeNodeLevel(treeData[0].children[0])).toBe(1);
  });
});
