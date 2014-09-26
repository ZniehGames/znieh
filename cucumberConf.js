var env = require('./client/tests/environment.js');

exports.config = {

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true', 'no-sandbox', 'no-default-browser-check', 'no-first-run', 'disable-default-apps']
    }
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
