const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      main: './src/main.ts',
      polyfills: './src/polyfills.ts',
      vendor: './src/vendor.ts'
    },
    output: {
        path: path.join(__dirname, '/app'),
        filename: '[name].bundle.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    module: {
      loaders: [
        { 
          test: /\.ts$/, 
          loader: 'ts-loader' 
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
    ]
};