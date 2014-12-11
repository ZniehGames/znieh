'use strict';

var User = require('./../model/user');
var TeamConsumer = require('./../consumers/teams.consumer');

function UserManager() {

  this.reloadTeam = function(user) {
    TeamConsumer.setTeam(user);
  };

}

module.exports = new UserManager();
