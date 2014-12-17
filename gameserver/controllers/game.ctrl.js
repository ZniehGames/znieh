'use strict';

var Game = require('./../model/game');
var UserStorage = require('./../storage/user.storage.js');
var GameStorage = require('./../storage/game.storage.js');
var UserManager = require('./../services/user.manager.js');
var GameManager = require('./../services/game.manager.js');
var Placement = require('./../services/placement.js');


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

  this.placementDone = function(socket, positions) {
    var game = GameStorage.findBySocket(socket);
    var player = UserStorage.findBySocket(socket);
    console.log('placement done'.blue, player.username);

    if (game.ready.length == 0) {
      GameManager.init(game);
    }

    game.ready.push(player);
    Placement.update(game, positions);

    if (game.ready.length === 2) {
        game.playerA.socket.emit('match ready', game.units);
        game.playerB.socket.emit('match ready', game.units);
    }

  }

}

module.exports = new GameCtrl();
