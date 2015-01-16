'use strict';

function Map(tiles, blockedTiles, width, height) {
    this.tiles = tiles;
    this.blockedTiles = blockedTiles;
    this.width = width;
    this.height = height;
}

Map.prototype.getGrid = function() {
  var i, j;
  var grid = [];
  for (i in this.tiles) {
    grid[i] = [];
      for (j in this.tiles[i]) {
        grid[i][j] = this.tiles[i][j];
      }
  }
  return grid;
};

Map.prototype.getWalkables = function() {
  var i, j;
  var walkables = [];
  for (i in this.tiles) {
      for (j in this.tiles[i]) {
        if (this.blockedTiles.indexOf(this.tiles[i][j]) === -1 && walkables.indexOf(this.tiles[i][j]) === -1) {
          walkables.push(this.tiles[i][j]);
        }
      }
  }
  return walkables;
};

module.exports = Map;
