'use strict';

function Game(playerA, playerB, map) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.ready = [];
    this.units = [];
    this.map = map;
}

Game.prototype.findUnitById = function(id) {
  for (var i = 0; i < this.units.length; i++) {
    if (this.units[i].id === id) {
      return this.units[i];
    }
  }
  console.log('unable to find unit'.red);
};

module.exports = Game;
