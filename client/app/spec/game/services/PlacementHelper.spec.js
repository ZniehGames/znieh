describe("PlacementHelper Tests", function() {

  var PlacementHelper;

  beforeEach(function(){
    PlacementHelper = new System.get('services/PlacementHelper').default;
  });

  it('should have valid random placement', function () {
    var units = [
      {},
      {},
      {},
      {}
    ];
    var positions = PlacementHelper.random(units, 'left');
    expect(positions[0].x).toBeLessThan(5);
    expect(positions[1].x).toBeLessThan(5);
    expect(positions[2].x).toBeLessThan(5);
    expect(positions[3].x).toBeLessThan(5);

    expect(positions[0].y).toBeLessThan(13);
    expect(positions[1].y).toBeLessThan(13);
    expect(positions[2].y).toBeLessThan(13);
    expect(positions[3].y).toBeLessThan(13);

    expect(positions[0].y).toBeGreaterThan(2);
    expect(positions[1].y).toBeGreaterThan(2);
    expect(positions[2].y).toBeGreaterThan(2);
    expect(positions[3].y).toBeGreaterThan(2);
  });

  it('should have valid right random placement', function () {
    var units = [
      {},
      {},
      {},
      {}
    ];
    var positions = PlacementHelper.random(units, 'right');
    expect(positions[0].x).toBeGreaterThan(19);
    expect(positions[1].x).toBeGreaterThan(19);
    expect(positions[2].x).toBeGreaterThan(19);
    expect(positions[3].x).toBeGreaterThan(19);

    expect(positions[0].y).toBeLessThan(13);
    expect(positions[1].y).toBeLessThan(13);
    expect(positions[2].y).toBeLessThan(13);
    expect(positions[3].y).toBeLessThan(13);

    expect(positions[0].y).toBeGreaterThan(2);
    expect(positions[1].y).toBeGreaterThan(2);
    expect(positions[2].y).toBeGreaterThan(2);
    expect(positions[3].y).toBeGreaterThan(2);
  });

});
