'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var bower_dir = path.resolve(__dirname, '../bower_components');
var node_dir = path.resolve(__dirname, '../node_modules');
var app = path.resolve(__dirname, '../src/app');

module.exports = {
    context: app,

    entry: {
        app: ['./app.module.js'],
        vendors: ['angular',
            'angular-ui-router',
            'rx',
            'rx-angular',
            'restangular',
            'jquery',
            'lodash',
            'bootstrap-dropdown',
            'moment',
            'd3',
            'n3-line-chart']
    },

    output: {
        filename: '[name].js',
        chunkFileName: '[id].js'
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js'],
        alias: {
            'n3-line-chart': bower_dir + '/n3-line-chart/build/line-chart.js',
            'bootstrap-dropdown': node_dir + '/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
        }
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment',
            _: 'lodash',
            d3: 'd3'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.html$/, loader: 'html'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?sourceMap!postcss!sass?sourceMap')
            },
            {
                test: /sinon\/pkg\/sinon\.js/,
                loader: 'imports?define=>false,require=>false'
            }
        ],
        noParse: [
        ]
    },

    postcss: function () {
        return [];
    }
};