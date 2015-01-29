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



  this.random = function(units, side, map) {
    var positions = [];
    var x, y;
    units.forEach(function(unit) {
      do {
        x = Math.floor((Math.random() * 5));
        y = Math.floor((Math.random() * 10) + 3);
        if (side === 'right') {
          x += 20;
        }
      } while(_.find(positions, {'x': x, 'y': y}) !== undefined || !map.isWalkableTile(x, y));
      positions.push({'x': x, 'y': y});
      unit.x = x;
      unit.y = y;
    });
    console.log('random done');
  };

}

module.exports = new Placement();
