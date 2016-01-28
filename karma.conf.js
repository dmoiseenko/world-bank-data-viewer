var webpack = require('webpack');
webpackConfig  = {};
var preprocessors = {};
var entry = './test/unit.js';
preprocessors[entry] = ['webpack'];

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            entry
        ],

        webpack: webpackConfig,

        exclude: [],

        preprocessors: preprocessors,

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: false,

        browsers: ['Chrome'],

        singleRun: true,

        concurrency: Infinity,

        plugins: [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-jasmine')
        ]
    })
};
