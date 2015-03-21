var MapManager = require('./map.manager.js');

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}
var MapData = requireUncached('./../../frontend/app/json/map.json');


describe("Map Manager tests", function() {

  it('can create a map', function () {
    var map = MapManager.create(MapData);
    expect(map).not.toBeNull();
    expect(map.tiles).not.toBeNull();
    expect(map.blockedTiles).not.toBeNull();
    expect(map.width).toBe(27);
    expect(map.height).toBe(15);
  });


});
