'use strict';

var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var cssnano = require('cssnano');
var CleanWebpackPlugin = require('clean-webpack-plugin');


var bower_dir = path.resolve(__dirname, '../bower_components');
var node_dir = path.resolve(__dirname, '../node_modules');
var build = path.resolve(__dirname, '../build');
var app = path.resolve(__dirname, '../src/app');

module.exports = {
    context: app,

    entry: {
        app: ['./app.module.js'],
        vendors: ['angular',
            'angular-ui-router',
            'd3',
            'n3-line-chart',
            'rx',
            'rx-angular',
            'lodash',
            'restangular',
            'jquery',
            'bootstrap-dropdown',
            'moment']
    },

    output: {
        path: build,
        publicPath: '/',
        filename: '[name].[chunkhash].js',
        chunkFileName: '[id].js'
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js'],
        alias: {
            'n3-line-chart': bower_dir + '/n3-line-chart/build/line-chart.min.js',
            'bootstrap-dropdown': node_dir + '/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
        }
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    plugins: [
        new CleanWebpackPlugin(build, {
            verbose: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.[chunkhash].js'),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery',
            moment: 'moment',
            d3: 'd3'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false,
            mangle: {
                except: ['$q']
            },
            sourceMap: false,
            output: {
                comments: false
            }
        })
    ],

    postcss: function () {
        return [cssnano({
            discardComments: {
                removeAll: true
            },
            autoprefixer: {
                add: true,
                browsers: ['last 2 versions']
            }
        })];
    },

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
                test: /sinon\.js$/,
                loader: "imports?define=>false,require=>false"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};