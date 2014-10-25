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
    console.log('ready');
  },

  framework: 'cucumber',

  specs: [
    'features/frontend/*.feature'
  ],

  cucumberOpts: {
    require: [],
    format: 'pretty'
  }
};
