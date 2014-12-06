'use strict';

var Game = require('./../model/game');
var UserStorage = require('./../storage/user.storage.js');

function GameCtrl() {

  var games = [];

  this.add = function (socketA, socketB) {
    var playerA = UserStorage.findBySocket(socketA);
    var playerB = UserStorage.findBySocket(socketB);

    if (playerA == null || playerB == null) {
      console.log('impossible de créer la partie'.red);
      return;
    }

    games.push(new Game(playerA, playerB));
  }

}

module.exports = new GameCtrl();
