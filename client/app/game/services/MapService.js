'use strict';

import Pathfinder from './Pathfinder';
import TweenService from './TweenService';
import GameController from '../controllers/GameController';

class MapService {

    constructor() {
      this.map = null;
    }

    init(map) {
      this.map = map;
      Pathfinder.init(map);
    }

    clean() {
      this.map.resetHighlight();
    }

    getTile(x, y) {
      return this.map.getTile(x, y);
    }

    highlightUnitPossibleMoves(unit) {
      this.map.resetHighlight();
      unit.tile = this.map.getTile(unit.x /32, unit.y /32); // to be removed

      // We find tiles around the unit
      var arounds = this.map.getTilesAround(unit.tile, unit.moves);

      // We need to add additional tile to avoid (eg: a unit)
      var unitsIndex = [];
      GameController.units.forEach(function(u) {
        if (unit !== u) {
          unitsIndex.push({'x': u.x /32, 'y': u.y /32}); // unit.tile.indexes
        }
      });

      Pathfinder.stopAvoidingAllAdditionalPoints();
      Pathfinder.addAdditionalPoints(unitsIndex);

      // We try to find a path for each
      arounds.forEach(function(tile){
        var start = {'x': unit.x /32, 'y': unit.y /32}; // unit.tile.indexes
        var end = tile.indexes;

        Pathfinder.findPathTo(start.x, start.y, end.x, end.y, function(path) {
          if (path === null) {
            return;
          }
          path.shift(); // remove start from path
          if (path.length < unit.moves) {
            tile.tint = 0x00FF00;
          }
        });
      });

    }

    move(unit, tile) {
        // remplace this by server sending path
        var start = {'x': unit.x /32, 'y': unit.y /32};
        var end = tile.indexes;
        this.clean();
        Pathfinder.findPathTo(start.x, start.y, end.x, end.y, function(path) {
          if (path === null) {
            return;
          }
          path.shift();
          TweenService.move(unit, path, function(){
            unit.tile = tile;
            unit.x = tile.position.x;
            unit.y = tile.position.y;
          });
        });
    }

}

export default new MapService();
