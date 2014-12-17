'use strict';

var Game = require('./../model/game');
var UserStorage = require('./../storage/user.storage.js');
var GameStorage = require('./../storage/game.storage.js');
var UserManager = require('./../services/user.manager.js');

function GameCtrl() {

  var games = [];

  this.add = function (socketA, socketB) {
    var playerA = UserStorage.findBySocket(socketA);
    var playerB = UserStorage.findBySocket(socketB);

    if (playerA == null || playerB == null) {
      console.log('impossible de créer la partie'.red);
      return;
    }

    UserManager.reloadTeam(playerA);
    UserManager.reloadTeam(playerB);
    GameStorage.add(new Game(playerA, playerB));
  }

  this.placementDone = function(socket) {
    var game = GameStorage.findBySocket(socket);
    var player = UserStorage.findBySocket(socket);

    if (!game.ready.indexOf(player)) {
        game.ready.push(player);
    }

    if (game.ready.length === 2) {
        game.playerA.socket.emit('match ready');
        game.playerB.socket.emit('match ready');
    }

  }

}

module.exports = new GameCtrl();
