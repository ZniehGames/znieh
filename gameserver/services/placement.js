'use strict';

var _ = require('lodash');
var User = require('./../model/user');

function Placement() {

  this.update = function(game, positions) {
    for (var i = positions.length - 1; i >= 0; i--) {
      var unit = _.find(game.units, { 'id': positions[i].id });
      if (!unit) {
        console.log('unable to find unit'.red, positions[i].id, 'in'.red, game.units);
        return false;
      }
      unit.x = positions[i].x;
      unit.y = positions[i].y;
    };
  };

}

module.exports = new Placement();
