var path = require('path');
var environmentConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, './environments.json'), 'utf8'));

module.exports = require('./webpack-make-config')({
  dir: path.resolve(__dirname, '../build'),

  defines: {
    __TESTING__: false,
    __DEV__: true,
    __STAGE__: false,
    __PRODUCTION__: false
  },

  sourcemaps: true,
  devtool: 'eval',
  debug: true,
  minimize: false,
  chunk: true
});