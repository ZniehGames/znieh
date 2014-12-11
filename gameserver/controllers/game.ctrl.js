'use strict';

var Game = require('./../model/game');
var UserStorage = require('./../storage/user.storage.js');
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

    var game = new Game(playerA, playerB);
    games.push(game);
  }

}

module.exports = new GameCtrl();
