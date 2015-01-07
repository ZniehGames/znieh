'use strict';

class Map {

  constructor(tiledmap) {
    this.tiledmap = tiledmap;
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j, k = 0;
    for (i in tiles) {
        for (j in tiles[i]) {
          tiles[i][j].index = k;
          tiles[i][j].indexes = {'x': parseInt(j), 'y': parseInt(i) };
          k++;
        }
    }
  }

  getTile(x, y) {
    var tiles = this.tiledmap.layers[0].tiles;
    return tiles[y][x];
  }

  // return array of index
  getBlockedTiles() {
      return [];
  }

  // return array of index
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

  // return grid of index
  getGrid() {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    var grid = [];
    for (i in tiles) {
      grid[i] = [];
        for (j in tiles[i]) {
          grid[i][j] = tiles[i][j].index;
        }
    }
    return grid;
  }

  resetHighlight() {
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    for (i in tiles) {
        for (j in tiles[i]) {
          tiles[i][j].tint = 0xFFFFFF;
        }
    }
  }

  getTilesAround(tile, range) {
    if (range < 0) {
      return [];
    }
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j;
    var ref = tile.indexes;
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

}

export default Map;
