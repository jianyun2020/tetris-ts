const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin  } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'script/bundle.js',
    path: path.resolve('./dist')
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin ()
  ],
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}