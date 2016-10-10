var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: './app/app.module.ts',

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    loaders: [
      {
        test: /image|\.(png|jpe?g|gif|svg|ico)$/,
        loader: 'file?name=[path][name].[ext]'
      },
      {
        test: /font|\.(woff|woff2|ttf|eot)$/,
        loader: 'file?name=assets/fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        exclude: /\/app\//,
        loader: ExtractTextPlugin.extract(
          'style',
          'css',
          'autoprefixer-loader?browsers=last 2 versions'
        )
      },
      {
        test: /\.scss$/,
        include: /\/app\//,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?sourceMap',
          'sass?sourceMap',
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
    }),
    new ExtractTextPlugin('assets/styles/[name].[hash].css')
  ],

  resolve: {
    alias: {
      'jquery-zoom': path.resolve(__dirname, 'lib/jquery-zoom/jquery-zoom.js')
    },
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  }
};