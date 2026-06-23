const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    planet: './src/planet.js'  
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'development',
  devServer: {
    static: './dist',
    port: 3000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/planet.html',
      filename: 'planet.html',
      chunks: ['planet']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
