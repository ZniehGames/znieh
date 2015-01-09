'use strict';

var Game = require('./../model/game');
var Unit = require('./../model/unit');


function GameManager() {

  this.init = function(game) {

    for (var i = game.playerA.team.units.length - 1; i >= 0; i--) {
      game.units.push(new Unit(game.playerA.team.units[i], game.playerA.username));
    };

    for (var i = game.playerB.team.units.length - 1; i >= 0; i--) {
      game.units.push(new Unit(game.playerB.team.units[i], game.playerB.username));
    };
  };

}

module.exports = new GameManager();
