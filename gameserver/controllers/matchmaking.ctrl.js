'use strict';

var Game = require('./../model/game');

function MatchmakingCtrl(io) {

  var queue = [];
  var games = [];

  this.add = function (socket) {

    var match = queue.shift();
    if (match === undefined) {
      queue.push(socket);
      return;
    }

    games.push(new Game(match, socket));
    socket.emit('match found');
    match.emit('match found');
  }

}

module.exports = MatchmakingCtrl;
