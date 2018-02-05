const merge = require('webpack-merge')
const { resolve } = require('path')
const prod = require('./prod')

module.exports = merge(prod, {
  devServer: {
    compress: true,
    open: true,
    contentBase: resolve(__dirname, '../build'),
  },
})
