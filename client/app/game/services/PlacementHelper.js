'use strict';

class PlacementHelper {

    random(units, side) {
      var positions = [];
      var x, y;
      units.forEach(function() {
        do {
          x = 32 * Math.floor((Math.random() * 5));
          y = 32 * Math.floor((Math.random() * 10) +2);
          if (side === 'right') {
            x += 640;
          }
         } while(!positions.indexOf({'x': x, 'y': y}));
        positions.push({'x': x, 'y': y});
      });
      return positions;
    }
}

export default PlacementHelper;