const { resolve } = require('path')

module.exports = {
	context: resolve(__dirname),
	entry: [
		'./index.js'
	],
	output: {
		path: resolve(__dirname),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	}
}
