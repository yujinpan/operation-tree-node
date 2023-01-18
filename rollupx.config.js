module.exports = {
  banner:
    '/*!\n' +
    ` * operation-tree-node v${require('./package.json').version}\n` +
    ` * (c) 2019-${new Date().getFullYear()} yujinpan\n` +
    ' * Released under the MIT License.\n' +
    ' */\n',
  inputFiles: ['**/*.ts'],
  outputDir: 'dist',
  typesOutputDir: 'dist',
  singleFile: false,
};
