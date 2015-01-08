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

  getWalkablesTiles(blockedTiles, game) {
        var map = game.cache.getTilemapData('map').data;
        var result = map.layers[0].data;
        var newarr = [];
                
        for (var i = 0; i < result.length; i++) {
            if(blockedTiles.indexOf(result[i]) === -1 && newarr.indexOf(result[i]) === -1){
                newarr.push(result[i]);
            }
        }
        return newarr;
    }

}

export default Map;
