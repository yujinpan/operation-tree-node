import treeAppendLevel from './treeAppendLevel';

describe('[treeAppendLevel]:', () => {
  it('should append level', () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];

    const appendLevelData = treeAppendLevel(treeData);

    expect(appendLevelData[0].level).toBe(0);
    expect(appendLevelData[0].children[0].level).toBe(1);
  });
});
