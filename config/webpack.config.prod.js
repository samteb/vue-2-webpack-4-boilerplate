'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const helpers = require('./helpers')
const commonConfig = require('./webpack.config.common')
const isProd = process.env.NODE_ENV === 'production'
const environment = isProd ? require('./env/prod.env') : require('./env/staging.env')

const webpackConfig = merge(commonConfig, {
  mode: 'production',
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: 'js/[contenthash].js',
    chunkFilename: 'js/[id].[contenthash].chunk.js',
  },
  plugins: [
    new webpack.EnvironmentPlugin(environment),
    // Extracts CSS into separate files
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})

if (!isProd) {
  webpackConfig.devtool = 'source-map'

  if (process.env.npm_config_report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
}

module.exports = webpackConfig
