var path = require('path');

module.exports = require('./webpack-make-config')({
  dir: path.resolve(__dirname, '../.build'),

  sourcemaps: false,
  devtool: 'eval',
  debug: true,
  minimize: false,
  chunk: false,
  testing: true
});