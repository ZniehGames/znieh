'use strict';

import InputService from '../services/InputService';

class Map {

  constructor(tiledmap) {
    this.tiledmap = tiledmap;
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j, k = 0;
    for (i in tiles) {
        for (j in tiles[i]) {
          tiles[i][j].index = k;
          tiles[i][j].indexes = {'x': parseInt(j), 'y': parseInt(i) };
          tiles[i][j].inputEnabled = true;
          tiles[i][j].events.onInputDown.add(InputService.onFieldDown, this);
          k++;
        }
    }
  }

  getTile(x, y) {
    return this.tiledmap.layers[0].tiles[y][x];
  }

  // return array of index
  getBlockedTiles() {
      var tiles = this.tiledmap.layers[0].tiles;
      var i, j, k = 0;
      var blockeds = [];
      for (i in tiles) {
          for (j in tiles[i]) {
            if (tiles[i][j].properties.collides === true) {
              blockeds.push(k);
            }
            k += 1;
          }
      }
      return blockeds;
  }

  // return array of index
  getWalkablesTiles() {
    var blockeds = this.getBlockedTiles();
    var tiles = this.tiledmap.layers[0].tiles;
    var i, j, k = 0;
    var walkables = [];
    for (i in tiles) {
        for (j in tiles[i]) {
          if (blockeds.indexOf(k) === -1) {
            walkables.push(k);
          }
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
          if (
              i > ref.y - range && i < ref.y + range &&
              j > ref.x - range && j < ref.x + range &&
              tiles[i][j] !== tile ) {
              arounds.push(tiles[i][j]);
          }
        }
    }
    return arounds;
  }

}

export default Map;
