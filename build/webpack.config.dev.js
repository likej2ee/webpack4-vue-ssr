const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const config = require('../config')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, config.BUILD_DIR),
    compress: true,
    hot: true,
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].[hash].js',
    // chunkFilename: '[name].[hash].js',
  },
})
