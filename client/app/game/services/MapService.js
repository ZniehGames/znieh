'use strict';

import Pathfinder from './Pathfinder';

class MapService {

    constructor() {
      this.map = null;
    }

    init(map) {
      this.map = map;
      Pathfinder.init(map);
    }

    highlightUnitPossibleMoves(unit) {
      this.map.resetHighlight();
      unit.tile = this.map.getTile(unit.x /32, unit.y /32);
      var arounds = this.map.getTilesAround(unit.tile, unit.moves);

      arounds.forEach(function(tile){
        var start = {'x': unit.x /32, 'y': unit.y /32};
        var end = tile.indexes;

        Pathfinder.findPathTo(start.x, start.y, end.x, end.y, function(path) {
          if (path === null) {
            return;
          }
          console.log(path);
          path.shift();
          if (path.length < unit.moves) {
            tile.tint = 0x00FF00;
          }
        });
      });

    }

    // move(unit, endx, endy) {

    // }

}

export default new MapService();
