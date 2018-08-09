const stripLoader = require('strip-loader');
const devConfig = require('./webpack-dev.config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const jsLoader = {
    test: [/\.(js|jsx|json)$/],
    exclude: /node_modules/,
    loader: stripLoader.loader('console.log')
};

devConfig.module.loaders.push(jsLoader);
devConfig.output.filename = '../dist/script.min.js';
devConfig.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin({
        filename: '../dist/style.min.css',
        allChunks: true
    }),
];

module.exports = devConfig;
