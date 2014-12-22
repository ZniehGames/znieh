'use strict';

class Map {

  constructor(tilemap) {
      this.tilemap = tilemap;
  }

  getBlockedTiles() {
      var blockeds = [];
      Object.keys(this.tilemap.tilesets[0].tileProperties).forEach(function(element) {
        blockeds.push(parseInt(element));
      });
      return blockeds;
  }

}

export default Map;
