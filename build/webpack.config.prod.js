const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HashOutput = require('webpack-plugin-hash-output')

const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new HashOutput({
      validateOutput: true,
      // Check that md5(assets/main.<hash>.js) === <hash>, but doesn't check fragments/app.html
      validateOutputRegex: /^assets\/.*\.js$/,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:12].css',
      // chunkFilename: '[name].[contenthash:12].css',
    }),
  ],
  output: {
    filename: '[name].[chunkhash:12].js',
    // chunkFilename: '[name].[chunkhash].js',
  },
})
