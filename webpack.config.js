var path = require('path');
var webpack = require('webpack');

var APP = path.resolve(__dirname, './src/app');

module.exports = {
    context: APP,
    entry: {
        app: './app.module.js'
    },
    output: {
        path: APP,
        filename: 'bundle.js'
    },
    resolve: {
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
        ]
    }
};