const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.min.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.tpl\.html$/,
      loader: 'ng-cache-loader?prefix=./',
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('css-loader', 'style-loader')
    },
    {
      test: /\.jpg$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({template: 'src/index.html'}),
    new ExtractTextPlugin('app.css'),
    new UglifyJSPlugin()
  ]
};
