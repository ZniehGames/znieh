'use strict';

import Unit from '../model/Unit';
import PlacementHelper from '../services/PlacementHelper';

class UnitsManager {

    createFromTeam(team, game) {
      var units = [];
      var positions = PlacementHelper.random(team.units, game.side);

      for (var i = 0; i < team.units.length; i++) {
          units.push(new Unit(game, positions[i].x * 32, positions[i].y * 32, team.units[i]));
      }
      return units;
    }

    create(data, game) {
      var units = [];
      for (var i = 0; i < data.length; i++) {
          units.push(new Unit(game, data[i].x, data[i].y, data[i]));
      }
      return units;
    }
}

export default UnitsManager;
