'use strict';

var _ = require('lodash');

function Placement() {

  this.update = function(game, positions) {
    for (var i = positions.length - 1; i >= 0; i--) {
      if (!this.isAllowed(game.map, positions[i])) {
        return -1;
      }

      var unit = _.find(game.units, { 'id': positions[i].id });
      unit.x = positions[i].x;
      unit.y = positions[i].y;
    };
  };

  this.isAllowed = function (map, position) {
    if (_.contains(map.blockedTiles, map.tiles[position.y][position.x])) {
      console.log('placement failed'.red, position);
      return false;
    }

    return true;
  };

}

module.exports = new Placement();
