module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'lib/angular/angular.js',
      'lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'js/myApp.js',
      'js/controllers.js',
      'test/unit/**/*.js'
    ],

    exclude: ['lib/angular/angular-scenario.js'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
