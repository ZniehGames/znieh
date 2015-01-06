'use strict';

import Unit from '../model/Unit';
import PlacementHelper from '../services/PlacementHelper';

class UnitsManager {

    constructor() {
      this.placementHelper = new PlacementHelper();
    }

    createFromTeam(team, game, spriteGroup) {
      var units = [];
      var positions = this.placementHelper.random(team.units, game.side);
      var unit = null;

      for (var i = 0; i < team.units.length; i++) {
          unit = new Unit(game, positions[i].x, positions[i].y, team.units[i]);
          units.push(unit);
          spriteGroup.add(unit);
      }
      return units;
    }

    create(data, game, spriteGroup) {
      var units = [];
      var unit = null;
      for (var i = 0; i < data.length; i++) {
          unit = new Unit(game, data[i].x, data[i].y, data[i]);
          units.push(unit);
          spriteGroup.add(unit);
      }
      return units;
    }
}

export default UnitsManager;
