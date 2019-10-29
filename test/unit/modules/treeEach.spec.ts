import { treeEach } from 'src';

describe('[treeEach]:', () => {
  it("get all tree node's name", () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
    const names: string[] = [];
    treeEach(treeData, (node) => names.push(node.name));
    expect(names).toEqual(['1', '2']);
  });

  it("get all tree node's name use `props`", () => {
    const treeData = [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }];
    const names: string[] = [];
    treeEach(treeData, (node) => names.push(node.name), { children: 'child' });
    expect(names).toEqual(['1', '2']);
  });
});
