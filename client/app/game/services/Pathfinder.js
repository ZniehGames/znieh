'use strict';

class Pathfinder {

    constructor() {
      this.easyStar = new EasyStar.js();
    }

    init(map) {
      this.easyStar.setGrid(map.getGrid());
      var walkables = map.getWalkablesTiles();
      this.easyStar.setAcceptableTiles(walkables);
      for (var i = 0; i < walkables.length; i++)
      {
        this.easyStar.setTileCost(walkables[i], 1);
      }
    }

    addAdditionalPoints(points) {
      for (var i = 0; i < points.length; i++)
      {
        this.easyStar.avoidAdditionalPoint(points[i].x,points[i].y);
      }
    }

    stopAvoidingAllAdditionalPoints() {
        this.easyStar.stopAvoidingAllAdditionalPoints();      
    }

    findPathTo(startX, startY, endX, endY, callback) {
        this.easyStar.findPath(startX, startY, endX, endY, callback);
        this.easyStar.calculate();
    }

}

export default new Pathfinder();
