const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path')
const prod = require('./prod')

module.exports = merge(prod, {
	devServer: {
		compress: true,
		open: true,
		contentBase: resolve(__dirname, '../build'),
	},
})
