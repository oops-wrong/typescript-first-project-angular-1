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
      manifest: require('./vendor-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./libs-manifest.json')
    }),
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