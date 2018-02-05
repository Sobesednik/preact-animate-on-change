const { SourceMapDevToolPlugin } = require('webpack')
const w = require('./webpack.config')

const { plugins = [] } = w

const webpack = {
  ...w,
  ...{
    plugins: [
      ...plugins,
      // enable source map for jsx (see github)
      new SourceMapDevToolPlugin({
        test: /\.(js|css|jsx|ts|tsx)($|\?)/i,
        moduleFilenameTemplate: '[absolute-resource-path]',
        fallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
      }),
    ],
    devtool: 'inline-source-map',
    output: {},
    externals: [],
  },
}

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine'],
    customLaunchers: {
      ChromeDebugging: {
        base: 'ChromeHeadless',
        flags: ['--remote-debugging-port=9333'],
      },
    },
    browsers: ['ChromeDebugging'],
    files: [
      { pattern: 'test/*.jsx', watched: false },
    ],
    preprocessors: {
      'test/*.jsx': ['webpack', 'sourcemap'],
    },
    webpack,
    proxies: {
      '/node_modules/preact/dist/preact.esm.js.map': '/base/test/preact.esm.js.map',
    },
  })
}
