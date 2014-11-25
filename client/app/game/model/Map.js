class Map {

    constructor(tilemap) {
      this.tilemap = tilemap;
    }

    getBlockedTiles() {
        var arrayInt = [];
        Object.keys(this.tilemap.tilesets[0].tileProperties).forEach(function(element) {
          arrayInt.push(parseInt(element));
        });
        return arrayInt;
    }

}

export default Map;
