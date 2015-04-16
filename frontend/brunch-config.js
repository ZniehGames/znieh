'use strict';

exports.config = {
  paths: {
    watched: [
      'app',
      'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.js'
    ],
  },
  conventions: {
    // ignored: /^app\/spec/
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': [
          'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/dist/lodash.compat.js',
          'bower_components/phaser/build/phaser.js',
          'bower_components/eventEmitter/EventEmitter.js',
          'bower_components/react/react.js',
          'bower_components/flux/dist/Flux.js',
          'bower_components/fetch/fetch.js',
          'app/plugins/phaser-tiled.js'
        ],
        'js/app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: 'styles/main.css'
    }
  },
  plugins: {
    'sass': {
      allowCache: true,
      options: {
        includePaths: ['bower_components/bootstrap/assets/stylesheets/bootstrap']
      }
    },
    'fb-flo': {
      port: 8888
    },
    'cleancss': {
      keepSpecialComments: 0,
      removeEmpty: true
    }
  },
  onCompile: function() {
    require('fs').appendFile('public/js/app.js', '\n\nrequire(\'app\');');
  }
};
