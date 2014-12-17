'use strict';

var Game = require('./../model/game');

function GameStorage() {

  this.games =  [];

  this.add = function(game) {
     this.games.push(game);
  };

  this.remove = function(game) {
    this.games.splice(this.games.indexOf(game), 1);
  };

  this.findBySocket = function(socket) {
    for (var i = 0; i < this.games.length; i++) {
      if (this.games[i].socket === socket) {
        return this.games[i];
      }
    }
    return null;
  };

}

module.exports = new GameStorage();
