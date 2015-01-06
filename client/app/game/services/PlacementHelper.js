'use strict';

class PlacementHelper {

    random(units, side) {
      var positions = [];
      var x, y;
      units.forEach(function() {
        do {
          x = Math.floor((Math.random() * 5));
          y = Math.floor((Math.random() * 10) + 3);
          if (side === 'right') {
            x += 20;
          }
         } while(!positions.indexOf({'x': x, 'y': y}));
        positions.push({'x': x, 'y': y});
      });
      return positions;
    }
}

export default new PlacementHelper();
