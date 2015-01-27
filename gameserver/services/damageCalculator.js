'use strict';

function DamageCalculator() {

  this.isCriticDamage = function() {
      return Math.floor((Math.random() * 100)) < 20;
  }

  this.calculate = function(attacker, defender) {
    if (this.isCriticDamage()) {
      return Math.floor(attacker.weapon.max_damage * 1.4142);
    }
    return Math.floor((Math.random() * attacker.weapon.max_damage) + attacker.weapon.min_damage);
  }

}

module.exports = new DamageCalculator();
