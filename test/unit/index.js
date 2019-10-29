// require all modules ending in ".spec" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /\.spec\.(ts|js)$/);

testsContext.keys().forEach(testsContext);
