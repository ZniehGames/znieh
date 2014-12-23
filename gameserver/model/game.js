'use strict';

function Game(playerA, playerB) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.ready = [];
    this.units = [];
    this.map = null;
}

module.exports = Game;
