'use strict';

var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
    module: {
        loaders: [
            {
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false"
            }
        ]
    }
});

module.exports = function (wallaby) {

    return {
        files: [
            {pattern: 'node_modules/sinon/lib/sinon.js', instrument: false},
            {pattern: 'src/**/*.js', load: false},
            {pattern: 'src/**/*.spec.js', ignore: true}
        ],

        tests: [
            {pattern: 'src/**/*.spec.js', load: false}
        ],

        postprocessor: webpackPostprocessor,

        testFramework: 'mocha',

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
