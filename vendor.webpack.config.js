var path = require('path');
var webpack = require('webpack');

var config = require('./build.config.json');

module.exports = {
  devtool: 'source-map',

  entry: {
    'vendor': ['angular', 'angular-animate', 'angular-resource', 'angular-ui-router', 'ng-dialog', 'jquery-zoom'],
    'libs': ['jquery']
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, config.build_dir),

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({

      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.join(__dirname, '[name]-manifest.json'),

      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // new webpack.optimize.UglifyJsPlugin()
  ],

  resolve: {
    alias: {
      'jquery-zoom': path.resolve(__dirname, 'lib/jquery-zoom/jquery-zoom.js')
    }
  }
};