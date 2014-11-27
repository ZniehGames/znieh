'use strict';

var User = require('./../model/user');
var MatchMakingCtrl = require('./matchmaking.ctrl');

module.exports = function connectionCtrl(io) {

  console.log('connectionCtrl');

  var matchMakingCtrl = new MatchMakingCtrl();
  var users = [];

  io.on('connection', function(socket) {

    console.log('a user connected');

    socket.on('authenticate', function(pseudo) { // silly auth... should be replace by jwt
      var user = new User(pseudo, socket);
      users.push(user);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('search match', function() {
      matchMakingCtrl.add(socket);
    });

  });
}
