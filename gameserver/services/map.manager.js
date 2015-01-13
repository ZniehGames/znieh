'use strict';

var Map = require('./../model/map');

function MapManager() {

  this.create = function(data) {

    var width = data.layers[0].width;
    var height = data.layers[0].height;

    // 1D array to 2D
    var tiles = [];
    while (data.layers[0].data.length) {
      tiles.push(data.layers[0].data.splice(0, width));
    }

    var blockedTiles = [];
    var tileProperties = data.tilesets[0].tileproperties;
    Object.keys(tileProperties).forEach(function(tile) {
      blockedTiles.push(parseInt(tile));
    });

    return new Map(tiles, blockedTiles, width, height);

  };

}

module.exports = new MapManager();
