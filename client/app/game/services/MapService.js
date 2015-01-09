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

      // We find tiles around the unit
      var arounds = this.map.getTilesAround(unit.tile, unit.moves);

      // We need to add additional tile to avoid (eg: a unit)
      var unitsIndex = [];
      GameController.units.forEach(function(u) {
        if (u !== unit) {
          unitsIndex.push(u.tile.indexes);
        }
      });

      Pathfinder.stopAvoidingAllAdditionalPoints();
      Pathfinder.addAdditionalPoints(unitsIndex);

      // We try to find a path for each
      arounds.forEach(function(tile){
        Pathfinder.findPathTo(unit.tile.indexes, tile.indexes, function(path) {
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
        this.clean();

        // TODO: remplace this by server sending path
        Pathfinder.findPathTo(unit.tile.indexes, tile.indexes, function(path) {
          if (path === null) {
            return;
          }
          path.shift();
          TweenService.move(unit, path, function() {
            unit.tile = tile;
            unit.x = tile.position.x;
            unit.y = tile.position.y;
          });
        });
    }

}

export default new MapService();
