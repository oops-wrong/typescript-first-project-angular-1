var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var extractCSS = new ExtractTextPlugin('assets/styles/[name].[hash].css');
var extractSASS = new ExtractTextPlugin('assets/styles/[name].[hash].css');

module.exports = {
  context: path.join(__dirname, '../app'),

  devtool: 'source-map',

  entry: {
    'app': './app.ts',
    'vendor': './vendor.ts'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist')
  },

  module: {
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        exclude: /font/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /font|\.(woff|woff2|ttf|eot)$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: /\/app\//,
        loader: extractCSS.extract(
          'style',
          'css?sourceMap',
          'autoprefixer-loader?browsers=last 2 versions'
        )
      },
      {
        test: /\.scss$/,
        include: /\/app\//,
        loader: extractSASS.extract(
          'style',
          'css?sourceMap!sass?sourceMap',
          'autoprefixer-loader?browsers=last 2 versions'
        )
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./libs0-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./libs1-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../dist/index.html')
    }),
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, '../dist/index.html')
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    extractCSS,
    extractSASS
  ],

  resolve: {
    alias: {
      'jquery-zoom': path.resolve(__dirname, '../helpers/jquery-zoom/jquery-zoom.js')
    },
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss']
  }
};