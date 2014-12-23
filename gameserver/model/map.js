'use strict';

function Map(map) {
    this.map = map;
    this.tiles = map.layers[0].data;
    this.blockedTiles = [];
    this.width = map.layers[0].width;
    this.height = map.layers[0].height;
}

module.exports = Map;
