const banner =
  '/*!\n' +
  ` * operation-tree-node v${require('../package.json').version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} yujinpan\n` +
  ' * Released under the MIT License.\n' +
  ' */\n';

const outputDir = 'dist';

// multi package
const multiOption = [
  {
    input: 'src/index.ts',
    output: createOutputOptions('index')
  },
  {
    input: 'src/treeEach.ts',
    output: createOutputOptions('treeEach')
  },
  {
    input: 'src/treeMap.ts',
    output: createOutputOptions('treeMap')
  },
  {
    input: 'src/treeFilter.ts',
    output: createOutputOptions('treeFilter')
  },
  {
    input: 'src/treeToFlatArray.ts',
    output: createOutputOptions('treeToFlatArray')
  },
  {
    input: 'src/treeMerge.ts',
    output: createOutputOptions('treeMerge')
  },
  {
    input: 'src/treeSort.ts',
    output: createOutputOptions('treeSort')
  },
  {
    input: 'src/treeEachParent.ts',
    output: createOutputOptions('treeEachParent')
  },
  {
    input: 'src/treeCheck.ts',
    output: createOutputOptions('treeCheck')
  },
  {
    input: 'src/treeFind.ts',
    output: createOutputOptions('treeFind')
  }
];

function createOutputOptions(name) {
  return [
    {
      file: `${outputDir}/${name}.common.js`,
      format: 'cjs'
    },
    {
      file: `${outputDir}/${name}.js`,
      format: 'es'
    }
  ];
}

module.exports = {
  banner,
  multiOption,
  outputDir
};
