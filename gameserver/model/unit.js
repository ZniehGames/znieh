'use strict';

function Unit(data, user) {
  this.x = 0;
  this.y = 0;
  this.id = data.id;
  this.moves = data.moves;
  this.user = user;
}

module.exports = Unit;
