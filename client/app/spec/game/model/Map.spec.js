describe("Map Tests", function() {

  var map;
  var tile = {};
  var tileCenter = {};


  beforeEach(function(){
    var Map = new System.get('model/Map').default;
    map = new Map();
    map.tiledmap = {};
    map.tiledmap.tilesets = [];
    map.tiledmap.layers = [];
    map.tiledmap.tilesets[0] = {};
    map.tiledmap.layers[0] = {};
    // map.tiledmap.tilesets[0].tileproperties = {
    //   "85":{"collides":false,"flippedX":0,"flippedY":0,"flippedAD":0},
    //   "270":{"blocked":true,"__tiledparsed":true},
    //   "292":{"blocked":true,"__tiledparsed":true,"flippedX":0,"flippedY":0,"flippedAD":0}
    // };

    map.tiledmap.layers[0].tiles = {
      '0': {'0': {},   '1': {},         '2': {}},
      '1': {'0': tile, '1': tileCenter, '2': {}},
      '2': {'0': {},   '1': {},         '2': {}},
    }
  });

  it('should have Map be defined', function () {
    expect(System.get('model/Map').default).toBeDefined();
  });

  it('should have blocked tiles', function () {
    expect(map.getBlockedTiles()).toEqual([]);
  });

  it('should have grid', function () {
    expect(map.getGrid()).toEqual(
      [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ]);
  });

  it('should have walkable tiles', function () {
    expect(map.getWalkablesTiles()).toEqual([ 0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('should find a tile position in grid ', function () {
    expect(map.getTileXY(tile)).toEqual({'x': 0, 'y': 1});
    expect(map.getTileXY(tileCenter)).toEqual({'x': 1, 'y': 1});
  });


  it('should find tiles around a tile ', function () {
    expect(map.getTilesAroundTile(tile, 2)).toEqual(
      [{}, {}, {}, {}, {}]
    );
    expect(map.getTilesAroundTile(tileCenter, 2)).toEqual(
      [{}, {}, {}, {}, {}, {}, {}, {}]
    );
  });

});
