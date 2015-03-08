var env = require('./tests/environment.js');

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
    'features/*.feature'
  ],

  cucumberOpts: {
    require: [
      'tests/home.steps.js',
      'tests/fight.steps.js',
      'tests/search.steps.js',
      'tests/login.steps.js',
      'tests/caserne.steps.js',
      'tests/gameserver.steps.js'
    ],
    format: 'pretty'
  }
};
