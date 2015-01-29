var Placement = require('./placement.js');

describe("Placement tests", function() {

  var units = [
    {'x': 0, 'y': 0},
    {'x': 0, 'y': 0},
    {'x': 0, 'y': 0},
    {'x': 0, 'y': 0}
  ];

  var map = {
    isWalkableTile: function(x, y) {return true;}
  };

  it('should have valid left random placement', function () {
    Placement.random(units, 'left', map);
    expect(units[0].x).toBeLessThan(5);
    expect(units[1].x).toBeLessThan(5);
    expect(units[2].x).toBeLessThan(5);
    expect(units[3].x).toBeLessThan(5);
    expect(units[0].y).toBeLessThan(13);
    expect(units[1].y).toBeLessThan(13);
    expect(units[2].y).toBeLessThan(13);
    expect(units[3].y).toBeLessThan(13);
    expect(units[0].y).toBeGreaterThan(2);
    expect(units[1].y).toBeGreaterThan(2);
    expect(units[2].y).toBeGreaterThan(2);
    expect(units[3].y).toBeGreaterThan(2);
  });

  it('should have valid right random placement', function () {
    Placement.random(units, 'right', map);
    expect(units[0].x).toBeGreaterThan(19);
    expect(units[1].x).toBeGreaterThan(19);
    expect(units[2].x).toBeGreaterThan(19);
    expect(units[3].x).toBeGreaterThan(19);

    expect(units[0].y).toBeLessThan(13);
    expect(units[1].y).toBeLessThan(13);
    expect(units[2].y).toBeLessThan(13);
    expect(units[3].y).toBeLessThan(13);

    expect(units[0].y).toBeGreaterThan(2);
    expect(units[1].y).toBeGreaterThan(2);
    expect(units[2].y).toBeGreaterThan(2);
    expect(units[3].y).toBeGreaterThan(2);
  });


});
