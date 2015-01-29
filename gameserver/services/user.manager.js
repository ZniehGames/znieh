'use strict';

var User = require('./../model/user');
var TeamConsumer = require('./../consumers/teams.consumer');
var Q = require('q');

function UserManager() {

  this.reloadTeam = function(user) {
    var deferred = Q.defer();

    TeamConsumer.setTeam(user).then(function() {
      deferred.resolve();
    });

    return deferred.promise;
  };

}

module.exports = new UserManager();
