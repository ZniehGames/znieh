'use strict';

var EasyStarLib = require('easystar');

function Pathfinding() {

  var easystar = null;

  this.prepare = function (map, acceptableTiles) {
    easystar = new EasyStar.js();
    easystar.setGrid(map);
    easystar.setAcceptableTiles(acceptableTiles);
  };

  this.calculate = function (start, end, callback) {
    easystar.findPath(start[0], start[1], end[0], end[1], callback);
    easystar.calculate();
  }

}

module.exports = new Pathfinding();
