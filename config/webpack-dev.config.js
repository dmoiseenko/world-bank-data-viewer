var path = require('path');

module.exports = require('./webpack-make-config')({
  dir: path.resolve(__dirname, '../build'),

  defines: {
    __TESTING__: false,
    __DEV__: true,
    __PRODUCTION__: false
  },

  sourcemaps: true,
  devtool: 'eval',
  debug: true,
  minimize: false,
  chunk: true
});