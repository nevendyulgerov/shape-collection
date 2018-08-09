const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: [
    './index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|json)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ],
    loaders: []
  },
  plugins: [],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, './bundle')
  }
};
