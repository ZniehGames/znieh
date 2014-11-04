var env = require('./client/tests/environment.js');

exports.config = {

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true', 'no-sandbox', 'no-default-browser-check', 'no-first-run', 'disable-default-apps']
    }
  },

  // A callback function called once protractor is ready and available, and
  // before the specs are executed
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function() {
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);
    console.log('Ready !');
  },

  framework: 'cucumber',

  specs: [
    'features/frontend/*.feature'
  ],

  cucumberOpts: {
    require: [
      'client/tests/hello.steps.js',
      'client/tests/home.steps.js',
      'client/tests/fight.steps.js'
    ],
    format: 'pretty'
  }
};
