'use strict';

var Game = require('./../model/game');

function MatchmakingCtrl() {

  var queue = [];
  var games = [];

  this.add = function (socket) {

    var match = queue.shift();
    if (match === undefined || match.connected === false) {
      queue.push(socket);
      socket.emit('searching match');
      return;
    }

    games.push(new Game(match, socket));
    socket.emit('match found');
    match.emit('match found');
  }

}

module.exports = new MatchmakingCtrl();
