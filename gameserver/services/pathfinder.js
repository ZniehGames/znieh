'use strict';

var EasyStar = require('easystarjs');

function Pathfinder() {

  var easystar = new EasyStar.js();

  this.init = function (map) {
    easystar.setGrid(map.getGrid());
    easystar.setAcceptableTiles(map.getWalkables());
  };

  this.addAdditionalPoints = function(points) {
    for (var i = 0; i < points.length; i++)
    {
      easystar.avoidAdditionalPoint(points[i].x,points[i].y);
    }
  }

  this.stopAvoidingAllAdditionalPoints =function() {
      easystar.stopAvoidingAllAdditionalPoints();
  }

  this.findPathTo = function(start, end, callback) {
      easystar.findPath(start.x, start.y, end.x, end.y, callback);
      easystar.calculate();
  }

}

module.exports = new Pathfinder();
