var path = require('path');
var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';
var node_dir = __dirname + '/node_modules';
var app = path.resolve(__dirname, './src/app');

module.exports = {
    context: app,
    entry: {
        app: './app.module.js',
        vendors: ['angular',
            'angular-ui-router',
            'd3',
            'n3-line-chart',
            'rx',
            'rx-angular',
            'lodash',
            'restangular',
            'jquery']
    },
    output: {
        path: app,
        filename: 'bundle.js',
        sourceMapFileName: '[name].map'
    },
    resolve: {
        alias: {
            'n3-line-chart': bower_dir + '/n3-line-chart/build/line-chart.js',
            'jquery': node_dir + '/jquery/dist/jquery.js',
            'angular-perfect-scrollbar': bower_dir + '/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.ProvidePlugin({
            _: 'lodash',
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    module: {
        noParse: [bower_dir + '/n3-line-chart/build/line-chart.min.js'],
        loaders: [

            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                exclude: [
                    /bootstrap[\\\/]js[\\\/]/
                ],
                loader: 'style!css!sass' // TODO !autoprefixer
            },
            // **IMPORTANT** This is needed so that each bootstrap js file required by
            // bootstrap-webpack has access to the jQuery object
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

            // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
            // loads bootstrap's css.
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    devtool: 'source-map'
};