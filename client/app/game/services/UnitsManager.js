'use strict';

import Unit from '../model/Unit';
import GameController from '../controllers/GameController';
import MapService from './MapService';

class UnitsManager {

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
