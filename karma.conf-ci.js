// Karma configuration
// Generated on Sun Jan 03 2016 14:44:45 GMT+0100 (Vest-Europa (normaltid))
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    browsers: ['ChromeHeadless'],
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'index.js',
      'test.js'
    ],
    preprocessors: {
      '*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: ['babelify']
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: true,
    concurrency: 5
  })
}
