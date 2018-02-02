module.exports = function (config) {
  config.set({
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
  })
}
