const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dirName = resolve(__dirname, '../src')

module.exports = {
  context: dirName,
  entry: [
    '.',
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Preact Animate on Change',
      favicon: '../html/favicon.ico',
      template: '../html/demo.html',
    }),
  ],
}
