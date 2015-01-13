'use strict';

function Map(tiles, blockedTiles, width, height) {
    this.tiles = tiles;
    this.blockedTiles = blockedTiles;
    this.width = width;
    this.height = height;
}

module.exports = Map;
