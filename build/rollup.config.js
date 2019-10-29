const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const visualizer = require('rollup-plugin-visualizer');

require('dotenv').config();

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  plugins: [
    alias(require('./alias')),
    resolve({
      extensions
    }),
    commonjs(),
    babel({ extensions, include: ['src/**/*'] }),
    json(),
    visualizer({
      filename: './stat/statistics.html'
    })
  ]
};
