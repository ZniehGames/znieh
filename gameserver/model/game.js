'use strict';

function Game(playerA, playerB, map) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.ready = [];
    this.units = [];
    this.map = map;
}

module.exports = Game;
