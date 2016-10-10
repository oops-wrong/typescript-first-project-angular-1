var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var config = require('./build.config.json');

module.exports = {
  devtool: 'source-map',

  entry: './app/app.module.ts',

  output: {
    filename: './[name].js',
    path: path.join(__dirname, config.build_dir)
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./vendor-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./libs-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: 'dist/index.html'
    }),
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, './dist/index.html')
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  resolve: {
    alias: {
      'jquery-zoom': path.resolve(__dirname, 'lib/jquery-zoom/jquery-zoom.js')
    },
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  }
};