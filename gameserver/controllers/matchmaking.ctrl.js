'use strict';

var GameController = require('./game.ctrl.js');

function MatchmakingCtrl() {

  var queue = [];

  this.add = function (socket) {

    var match = queue.shift();
    if (match === undefined || match.disconnected === true) {
      queue.push(socket);
      socket.emit('searching match');
      return;
    }

    GameController.add(match, socket);
    socket.emit('match found');
    match.emit('match found');
  }

}

module.exports = new MatchmakingCtrl();
