'use strict';

var _ = require('lodash');

var GameController = require('./game.ctrl.js');
var GameStorage = require('./../storage/game.storage.js');
var UserStorage = require('./../storage/user.storage.js');

function MatchmakingCtrl() {

  var queue = [];

  this.add = function (socket) {

    var player = UserStorage.findBySocket(socket);

    if (!player) {
        console.log('unknown player'.red);
        return;
    }

    if (_.indexOf(queue, player) != -1) {
        console.log('player already in queue'.red);
        return;
    }

    var game = GameStorage.findByUsername(player.username);
    if (game != null) {
        console.log('player already in a game'.red);
        GameStorage.remove(game);
    }

    var match = queue.shift();

    if (match === undefined) {
      queue.push(player);
      player.socket.emit('searching match');
      return;
    }

    player.socket.emit('match found', 'left');
    match.socket.emit('match found', 'right');
    console.log('new game'.green);
    GameController.add(match, player);
  }

}

module.exports = new MatchmakingCtrl();
