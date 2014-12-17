'use strict';

function Game(playerA, playerB) {
    this.playerA = playerA;
    this.playerB = playerB;
    this.ready = [];
    this.units = [];
}

module.exports = Game;
