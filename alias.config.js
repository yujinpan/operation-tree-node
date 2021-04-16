const path = require('path');
const tsPaths = require('./tsconfig.json').compilerOptions.paths;

// 从 ts-config 中获取路径别名配置
const aliasConfig = (function getAliasFromTSConfig() {
  const aliasConfig = {};

  for (const key in tsPaths) {
    if (tsPaths[key].length > 1) {
      console.warn(
        'alias.config.js warn:',
        'tsconfig.json paths value must be only one.\n'
      );
    }
    // must use root path
    aliasConfig[transformPath(key)] =
      path.resolve('./') + '/' + transformPath(tsPaths[key][0]);
  }

  return aliasConfig;
})();

function transformPath(path) {
  return path.replace('/*', '');
}

module.exports = aliasConfig;
