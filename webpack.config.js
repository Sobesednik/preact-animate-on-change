const { ProvidePlugin } = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: [
    './src',
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|dist)/,
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
  externals: ['preact'],
  plugins: [
    new ProvidePlugin({
      h: ['preact', 'h'],
    }),
  ],
}