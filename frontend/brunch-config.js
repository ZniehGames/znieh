'use strict';

exports.config = {
  paths: {
    watched: [
      'app',
      'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.js'
    ],
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': [
          'node_modules/babel-brunch/node_modules/babel-core/browser-polyfill.js',
          'bower_components/jquery/dist/jquery.js',
          'bower_components/lodash/dist/lodash.compat.js',
          'bower_components/phaser/build/phaser.js',
          'bower_components/phaser-tiled/dist/phaser-tiled.js',
          'bower_components/eventEmitter/EventEmitter.js',
          'bower_components/react/react-with-addons.js',
          'bower_components/react-router/build/global/ReactRouter.js',
          'bower_components/flux/dist/Flux.js',
          'bower_components/fetch/fetch.js',
          'bower_components/toastr/toastr.js'
        ],
        'js/app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: 'styles/layout.css'
    }
  },
  plugins: {
    'sass': {
      allowCache: true,
      mode: 'native'
    },
    'postcss': {
      'processors': [
        require('autoprefixer')(['last 8 versions']),
      ]
    },
    'fb-flo': {
      port: 8888
    },
    'cleancss': {
      keepSpecialComments: 0,
      removeEmpty: true
    },
    uglify: {
      mangle: true,
      compress: false
    }
  },
  onCompile: function() {
    require('fs').appendFile('public/js/app.js', '\n\nrequire(\'js/index\');');
  }
};
