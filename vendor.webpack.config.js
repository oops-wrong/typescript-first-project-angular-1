var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var config = require('./build.config.json');

module.exports = {
  devtool: 'source-map',

  entry: {
    'libs': ['jquery'],
    'vendor': ['angular', 'angular-animate', 'angular-resource', 'angular-ui-router', 'ng-dialog', 'jquery-zoom']
  },

  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, config.build_dir),
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: 'app/index.html'
    })
  ],

  resolve: {
    alias: {
      'jquery-zoom': path.resolve(__dirname, 'lib/jquery-zoom/jquery-zoom.js')
    }
  }
};