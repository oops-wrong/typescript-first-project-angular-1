var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: {
    'dll': ['jquery', 'angular', 'angular-animate', 'angular-resource', 'angular-ui-router', 'ng-dialog']
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
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      template: path.resolve(__dirname, '../app/index.html')
    })
  ]
};