import Tile from 'model/Tile';
import Unit from 'model/Unit';

class Map {

    constructor(tilemap) {
      this.tilemap = tilemap;

      // maybe find a cleaner way...
      var tiles = [];
      this.tilemap.tiles.forEach(function(tile) {
         tiles.push(new Tile(tile[0], tile[1]));
      });
      this.tiles = tiles;
    }

    getBlockedTiles() {
        var arrayInt = [];
        Object.keys(this.tilemap.tilesets[0].tileProperties).forEach(function(element) {
          arrayInt.push(parseInt(element));
        });
        return arrayInt;
    }

    // this should be deleted, only for test...
    randomUnitsPlacement(units) {
      var tiles = this.tiles;
      units.forEach(function(u){
          tiles[Math.floor((Math.random() * 100) + 1)].addUnit(u);
      });
    }

}

export default Map;
