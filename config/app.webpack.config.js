var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');
var webpack = require('webpack');

var isDebug = true;
var isWatch = false;

if (~process.argv.indexOf('--prod')) {
  isDebug = false;
}

if (~process.argv.indexOf('--watch')) {
  isWatch = true;
}

function devtool() {
  return isDebug ? 'source-map' : '';
}

function hash() {
  return isDebug ? '' : '.[hash]';
}

function prodPlugin(plugin) {
  if (!isDebug) {
    return plugin;
  }

  return function () {};
}

function watchPlugin(plugin) {
  if (isWatch) {
    return plugin;
  }

  return function () {};
}

var extractCSS = new ExtractTextPlugin('assets/styles/[name]' + hash() + '.css');
var extractSASS = new ExtractTextPlugin('assets/styles/[name]' + hash() + '.css');

module.exports = {
  context: path.join(__dirname, '../app'),

  devServer: {
    contentBase: 'dist/',
    noInfo: true,
    port: 9000
  },

  devtool: devtool(),

  entry: {
    'app': './app.ts',
    'vendor': './vendor.ts'
  },

  output: {
    filename: '[name]' + hash() + '.js',
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
        loader: 'awesome-typescript-loader?tsconfig=config/tsconfig.json'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../dist/index.html')
    }),
    watchPlugin(new LiveReloadPlugin({appendScriptTag: true})),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dll-manifest.json')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, '../dist/index.html')
    ]),
    extractCSS,
    extractSASS,
    prodPlugin(new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }))
  ],

  resolve: {
    extensions: ['', '.ts', '.js', '.scss']
  }
};