'use strict';

var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/**/*.spec.js', ignore: true}
        ],

        tests: [
            {pattern: 'src/**/*.spec.js', load: false}
        ],

        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
