var path = require('path');

module.exports = require('./webpack-make-config')({
    dir: path.resolve(__dirname, '../build'),

    defines: {
        __TESTING__: false,
        __DEV__: false,
        __STAGE__: false,
        __PRODUCTION__: true
    },

    sourcemaps: false,
    devtool: '',
    debug: false,
    minimize: true,
    chunk: true
});