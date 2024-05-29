import { treeFind } from '@/index';

describe('[treeFind]:', () => {
  it('get node by id is 1', () => {
    const treeData = [
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] },
      { id: 1, name: '1', children: [{ id: 2, name: '2' }] }
    ];
    const find = treeFind(treeData, (node) => node.id === 1);
    expect(find).toEqual(treeData[0]);
  });

  it('get node by id is 2', () => {
    const treeData = [{ id: 1, name: '1', children: [{ id: 2, name: '2' }] }];
    const find = treeFind(treeData, (node) => node.id === 2);
    // @ts-ignore
    expect(find).toEqual({ id: 2, name: '2' });
  });

  it('get node by id is 2 use props', () => {
    const treeData = [{ id: 1, name: '1', child: [{ id: 2, name: '2' }] }];
    const find = treeFind(treeData, (node) => node.id === 2, {
      children: 'child'
    });
    // @ts-ignore
    expect(find).toEqual({ id: 2, name: '2' });
  });
});
