'use strict';

class Map {

  constructor(tiledmap) {
      this.tiledmap = tiledmap;
  }

  getBlockedTiles() {
      return [];
  }

  getWalkablesTiles() {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j, k = 0;
    var walkables = [];
    for (i in tiles) {
        for (j in tiles[i]) {
          walkables.push(k);
          k += 1;
        }
    }
    return walkables;
  }

  getGrid() {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j, k = 0;
    var grid = [];
    for (i in tiles) {
      grid[i] = [];
        for (j in tiles[i]) {
          grid[i][j] = k;
          k += 1;
        }
    }
    return grid;
  }

  getTileXY(tile) {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    for (i in tiles) {
        for (j in tiles[i]) {
          if (tiles[i][j] === tile) {
            return {'x': parseInt(j), 'y': parseInt(i) };
          }
        }
    }
  }

  resetTint() {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    for (i in tiles) {
        for (j in tiles[i]) {
          tiles[i][j].tint = 0xFFFFFF;
        }
    }
  }

  getTilesAroundTile(tile, range) {
    if (range < 0) {
      return [];
    }
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    var ref = this.getTileXY(tile);
    var arounds = [];
    for (i in tiles) {
        for (j in tiles[i]) {
          if (i > ref.y - range && i < ref.y + range &&
              j > ref.x - range && j < ref.x + range
            ) {
            if (tiles[i][j] !== tile) {
              arounds.push(tiles[i][j]);
            }
          }
        }
    }
    return arounds;
  }

  getTilesAround(position, range) {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    for (i in tiles) {
        for (j in tiles[i]) {
          if (tiles[i][j].containsPoint(position.x, position.y)) {
            return this.getTilesAroundTile(tiles[i][j], range);
          }
        }
    }
  }

}

export default Map;
