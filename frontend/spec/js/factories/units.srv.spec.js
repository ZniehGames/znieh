describe("Units Service Tests", function() {

  beforeEach(module('znieh'));
  beforeEach(inject(function (_UnitsService_) {
      UnitsService = _UnitsService_;
  }));

  it('should have UnitsService be defined', function () {
    expect(UnitsService).toBeDefined();
  });

  it('should format empty unit', function () {

    var unit = {
      'size': 1,
      'physical': 1
    };

    expect(UnitsService.format(unit)).toEqual({
      'name': 'default name',
      'size': 1,
      'physical': 1,
      'weapon': {
        'parts': []
      },
      'armor': {
        'helm': {},
        'torso': {},
        'gloves': {},
        'greaves': {},
        'boots': {}
      }
    });
  });

  it('should format unit armor', function () {

    var unit = {
      'size': 1,
      'physical': 1,
      'armor': {
        'helm': {'part': 1},
        'gloves': {'part': 2, 'rune': 56}
      }
    };

    expect(UnitsService.format(unit)).toEqual({
      'name': 'default name',
      'size': 1,
      'physical': 1,
      'weapon': {
        'parts': []
      },
      'armor': {
        'helm': {'part': 1},
        'torso': {},
        'gloves': {'part': 2, 'rune': 56},
        'greaves': {},
        'boots': {}
      }
    });
  });

  it('should format unit weapon', function () {

    var unit = {
      'size': 1,
      'physical': 1,
      'weapon': {
        'parts': {
          0: 315,
          2: 316
        }
      }
    };

    expect(UnitsService.format(unit)).toEqual({
      'name': 'default name',
      'size': 1,
      'physical': 1,
      'weapon': {
        'parts': [315,316]
      },
      'armor': {
        'helm': {},
        'torso': {},
        'gloves': {},
        'greaves': {},
        'boots': {}
      }
    });
  });

});
