'use strict';

var Client = require('node-rest-client').Client;
var config = require('config');
var Q = require('q');

function TeamConsumer() {

  var client = new Client();

  this.setTeam = function (user) {
    var deferred = Q.defer();

    client.get(config.get('api') + 'users/' + user.id + '/team', function(data, response) {
      user.team = data[0];
      console.log('load user team'.blue, user.username);
      deferred.resolve();
    });

    return deferred.promise;
  }

}

module.exports = new TeamConsumer();
