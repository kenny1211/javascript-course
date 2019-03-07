//hook up webpack to bundle our code into a minified file, also let webpack know we will be using babel as a loader to convert our code so it can work in older browsers (bc we are using modern js - es6+)
//besides js entry point, we also need the babel-polyfill which creates es5 code based on our es6 code that can not be converted because it did not previously exist; such as promises
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
