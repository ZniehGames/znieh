'use strict';

var _ = require('lodash');

function Placement() {

  this.update = function(game, positions) {
    for (var i = positions.length - 1; i >= 0; i--) {
      var unit = _.find(game.units, { 'id': positions[i].id });
      unit.x = positions[i].x;
      unit.y = positions[i].y;
    };
  };

  this.isAvailable = function (game, position) {

  };

}

module.exports = new Placement();
