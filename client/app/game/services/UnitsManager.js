'use strict';

import Unit from '../model/Unit';
import GameController from '../controllers/GameController';
import PlacementHelper from './PlacementHelper';
import MapService from './MapService';

class UnitsManager {

    createFromTeam(team, game) {
      var units = [];
      var positions = PlacementHelper.random(team.units, game.side);
      for (var i = 0; i < team.units.length; i++) {
          units.push(new Unit(game, MapService.getTile(positions[i].x, positions[i].y), team.units[i]));
      }
      GameController.units = units;
      return units;
    }

    create(data, game) {
      var units = [];
      for (var i = 0; i < data.length; i++) {
          units.push(new Unit(game, MapService.getTile(data[i].x, data[i].y), data[i]));
      }
      GameController.units = units;
      return units;
    }
}

export default new UnitsManager();
