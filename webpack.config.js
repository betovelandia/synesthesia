const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './src/index'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: []
  }
};
