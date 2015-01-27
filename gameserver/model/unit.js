'use strict';

function Unit(data, user) {
  this.x = 0;
  this.y = 0;
  this.id = data.id;
  this.moves = data.moves;
  this.user = user;
  this.maxLife = data.life;
  this.life = data.life;
  this.name = data.name;
  this.weapon = data.weapon;
  this.armor = data.armor;
  this.weight = data.weight;
  this.stats = data.stats;
  this.size = data.size;
  this.physical = data.physical;
  this.sprite = data.sprite;

  this.isAlive = function() {
      return this.life > 0;
  };
}

module.exports = Unit;
