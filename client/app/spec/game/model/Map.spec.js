describe("Map Tests", function() {

  var InputService = {
    'onUnitDown': function() {}
  };
  var Tile = function(collides) {
    this.events = {
      'onInputDown': {
        'add': function() {}
      }
    }
    this.properties = {
      'collides': collides || false
    }
  };

  var map;
  var tile = new Tile();
  var tileCenter = new Tile();

  beforeEach(function(){
    var Map = System.get('model/Map').default;
    var tiledmap = {
      'layers': [
        {
          'tiles': {
            '0': {'0': new Tile(),   '1': new Tile(),         '2': new Tile()},
            '1': {'0': tile,         '1': tileCenter,         '2': new Tile()},
            '2': {'0': new Tile(),   '1': new Tile(),         '2': new Tile()},
          }
        }
      ]
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
