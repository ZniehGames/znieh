describe("Map Tests", function() {

  var map;
  var tile = {};
  var tileCenter = {};


  beforeEach(function(){
    var Map = new System.get('model/Map').default;
    var tiledmap = {};
    tiledmap.tilesets = [];
    tiledmap.layers = [];
    tiledmap.tilesets[0] = {};
    tiledmap.layers[0] = {};
    // tiledmap.tilesets[0].tileproperties = {
    //   "85":{"collides":false,"flippedX":0,"flippedY":0,"flippedAD":0},
    //   "270":{"blocked":true,"__tiledparsed":true},
    //   "292":{"blocked":true,"__tiledparsed":true,"flippedX":0,"flippedY":0,"flippedAD":0}
    // };

    tiledmap.layers[0].tiles = {
      '0': {'0': {},   '1': {},         '2': {}},
      '1': {'0': tile, '1': tileCenter, '2': {}},
      '2': {'0': {},   '1': {},         '2': {}},
    };
    map = new Map(tiledmap);
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


  it('should find tiles around a tile ', function () {
    expect(map.getTilesAround(tile, 2).length).toEqual(5);
    expect(map.getTilesAround(tileCenter, 2).length).toEqual(8);
  });

});
