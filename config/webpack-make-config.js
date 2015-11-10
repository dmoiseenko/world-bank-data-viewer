var path = require('path');
var webpack = require('webpack');
var path = require('path');
var bower_dir = path.resolve(__dirname, '../bower_components');
var node_dir = path.resolve(__dirname, '../node_modules');
var app = path.resolve(__dirname, '../src/app');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (options) {

    var context = app;

    var output = {
        path: options.dir + options.assetsDir,
        filename: 'bundle.js'
    };

    if (options.sourcemaps) {
        output.sourceMapFilename = '[name].map';
    }

    var entry = {
        app: './app.module.js',
        vendors: ['angular',
            'angular-ui-router',
            'd3',
            'n3-line-chart',
            'rx',
            'rx-angular',
            'lodash',
            'restangular',
            'jquery',
            'bootstrap-dropdown']
    };

    var aliases = {
        'n3-line-chart': bower_dir + '/n3-line-chart/build/line-chart.min.js',
        'jquery': node_dir + '/jquery/dist/jquery.min.js',
        'bootstrap-dropdown': node_dir + '/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
        'd3': bower_dir + '/d3/d3.min.js',
    };

    var loaders = [
        {
            test: /\.html$/, loader: 'html'
        },
        {
            test: /\.scss$/,
            exclude: [
                /bootstrap[\\\/]js[\\\/]/
            ],
            loader: ExtractTextPlugin.extract(
                "style",
                "css?sourceMap!postcss!sass?sourceMap")
        },
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}
    ];

    var postcss = function () {
        return [cssnano, autoprefixer];
    };

    var plugins = [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.optimize.AggressiveMergingPlugin({}),
        new webpack.ProvidePlugin({
                _: 'lodash',
                $: 'jquery',
                jQuery: 'jquery'
            }
        )
    ];

    if (options.minimize) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            warnings: false,
            mangle: {
                except: ['$q', '$ocLazyLoad']
            },
            sourceMap: false
        }));
    }

    if (options.defines) {
        plugins.push(new webpack.DefinePlugin(options.defines));
    }

    return {
        entry: entry,
        context: context,
        output: output,

        devtool: options.devtool,
        debug: options.debug,

        module: {
            loaders: loaders,
            noParse: /\.min\.js/
        },

        resolve: {
            alias: aliases
        },

        plugins: plugins,

        postcss: postcss
    };
};
