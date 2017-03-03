'use strict';
const NODE_ENV = process.env.NODE_ENV;
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: __dirname + '/src/js/index',
  output: {
    path: __dirname + '/build/',
    filename: 'build.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      },
    }, {
      test: /\.less/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    }, {
      test: /\.(jpg|svg|png)$/,
      loader: 'file-loader',
      query: {
        name: 'assets/[name].[ext]'
      }
    }, {
      test: /\.(otf|eot|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
      query: {
        name: 'assets/[name].[ext]'
      }
    }]
  }
};
if (NODE_ENV === 'development') {
  Object.assign(config, {
    //watch: true,
    //watchOptions: {
    //	aggregateTimeout: 100
    ////},
    devtool: 'source-map'
  });
}
if (NODE_ENV == 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        dead_code: false
      }
    })
  )
}

module.exports = config;
