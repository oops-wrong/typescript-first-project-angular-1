var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var dll = require('../app/dll.js');

var isDebug = true;

if (~process.argv.indexOf('--prod')) {
  isDebug = false;
}

function devtool() {
  return isDebug ? 'source-map' : '';
}

function prodPlugin(plugin) {
  return isDebug ? (function () {}) : plugin;
}

module.exports = {
  devtool: devtool(),

  entry: {
    'dll': dll
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    library: '[name]'
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.join(__dirname, '..')
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: path.resolve(__dirname, '../app/index.html')
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    prodPlugin(new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }))
  ]
};