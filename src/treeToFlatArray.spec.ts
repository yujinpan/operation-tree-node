import { treeToFlatArray } from '@/index';

describe('[treeToFlatArray]:', () => {
  it('get flat array', () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
    const result = treeToFlatArray(treeData);
    expect(result).toEqual([
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
      { id: 2, name: '2' }
    ]);
  });

  it('get flat array use props', () => {
    const treeData = [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }];
    const result = treeToFlatArray(treeData, (node) => node, {
      children: 'child'
    });
    // @ts-ignore
    expect(result).toEqual([
      { id: 1, name: '1', child: [{ id: 2, name: '2' }] },
      { id: 2, name: '2' }
    ]);
  });

  it("get flat array and every one's id is +1", () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
    const result = treeToFlatArray(treeData, (node) => ({
      id: node.id + 1,
      name: node.name,
      ...(node.children ? { children: node.children } : {})
    }));
    // @ts-ignore
    expect(result).toEqual([
      { id: 2, name: '1', children: [{ id: 2, name: '2' }] },
      { id: 3, name: '2' }
    ]);
  });
});
