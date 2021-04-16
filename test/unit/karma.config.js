module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    files: ['index.js'],
    preprocessors: {
      'index.js': ['webpack', 'sourcemap']
    },
    browsers: ['Chrome'],
    singleRun: true,
    webpack: {
      mode: 'development',
      resolve: {
        alias: require('../../alias.config'),
        extensions: ['.ts', '.js']
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    },
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine',
      'karma-chrome-launcher'
    ]
  });
};
