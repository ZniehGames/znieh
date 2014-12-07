'use strict';

var Client = require('node-rest-client').Client;
var config = require('config');

function TeamConsumer() {

  var client = new Client();

  this.setTeam = function (user) {

    client.get(config.get('api') + 'users/' + user.id + '/team', function(data, response) {
      user.team = data[0];
      console.log('load user team'.blue, user.username);
      user.socket.emit('load user team', user.team);
    });
  }

}

module.exports = new TeamConsumer();
