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
    console.log('Ready !');
  },

  allScriptsTimeout: 20000,

  framework: 'cucumber',

  specs: [
    'features/frontend/*.feature'
  ],

  cucumberOpts: {
    require: [
      'client/tests/home.steps.js',
      'client/tests/fight.steps.js',
      'client/tests/search.steps.js',
      'client/tests/login.steps.js',
      'client/tests/caserne.steps.js',
      'client/tests/gameserver.steps.js'
    ],
    format: 'pretty'
  }
};
