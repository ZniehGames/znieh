import Tile from 'model/Tile';
import Unit from 'model/Unit';

class Map {

    constructor(tilemap) {
      this.tilemap = tilemap;

      // maybe find a cleaner way...
      var tiles = [];
      this.tilemap.tiles.forEach(function(tile) {
         tiles.push(new Tile(tile.x, tile.y));
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

    randomUnitsPlacement(units) {

      var i = 0;
      // units.forEach(function(u){
      //     this.tiles[i].addUnit(u);
      //     i++;
      // });

    }

}

export default Map;
