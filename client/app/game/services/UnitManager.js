'use strict';

import Unit from '../model/Unit';
import PlacementHelper from '../services/PlacementHelper';

class UnitManager {

    constructor() {
      this.placementHelper = new PlacementHelper();
    }

    createFromTeam(team, game) {
      var units = [];
      var positions = this.placementHelper.random(team.units);
      for (var i = 0; i < team.units.length; i++) {
          units.push(new Unit(game, positions[i].x, positions[i].y, team.units[i]));
      }
      return units;
    }
}

export default UnitManager;
