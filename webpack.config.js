var path = require('path');
var webpack = require('webpack');

var config = require('./build.config.json');

module.exports = {
  devtool: 'source-map',

  entry: './app/app.module.ts',

  output: {
    filename: './app.js',
    path: path.join(__dirname, config.build_dir)
  },

  module: {
    loaders: [
      {
        loader: 'babel-loader?cacheDirectory&presets[]=es2015!ts-loader',
        test: /\.ts$/
      }
    ]
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./angular-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./jquery-manifest.json')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  }
};