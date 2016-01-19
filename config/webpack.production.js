'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnano = require('cssnano');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var build = path.resolve(__dirname, '../build');

var config = require('./webpack.base.js');

config.output.path = path.resolve(__dirname, '../.build');

config.plugins.push(new ExtractTextPlugin('[name].[contenthash].css'));
config.plugins.push(new CleanWebpackPlugin(build, { verbose: true }));
config.plugins.push(new webpack.DefinePlugin({ NODE_ENV: JSON.stringify('production') }));
config.plugins.push(new webpack.optimize.CommonsChunkPlugin('vendors', 'vendor.[chunkhash].js'));
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    warnings: false,
    mangle: {
        except: ['$q']
    },
    sourceMap: false,
    output: {
        comments: false
    }
}));

config.postcss = function () {
    return [cssnano({
        discardComments: {
            removeAll: true
        },
        autoprefixer: {
            add: true,
            browsers: ['last 2 versions']
        }
    })];
}

config.output.filename = '[name].[chunkhash].js';

module.exports = config;