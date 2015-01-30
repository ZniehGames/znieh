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

    socket.emit('match found', 'left');
    match.emit('match found', 'right');
    GameController.add(match, socket);
  }

}

module.exports = new MatchmakingCtrl();
