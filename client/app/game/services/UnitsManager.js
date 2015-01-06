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
          unit = new Unit(game, positions[i].x*32, positions[i].y*32, team.units[i]);
          this.placementHelper.setMapPosition(unit, positions[i].x, positions[i].y);
          units.push(unit);
          spriteGroup.add(unit);
      }
      return units;
    }

    create(data, game, spriteGroup) {
      var units = [];
      var unit = null;
      for (var i = 0; i < data.length; i++) {
        unit = new Unit(game, data[i].x*32, data[i].y*32, data[i]);
        this.placementHelper.setMapPosition(unit, data[i].x, data[i].y);
        units.push(unit);
        spriteGroup.add(unit);
      }
      return units;
    }

    changePositionsUnits(units, game){
      var positions = this.placementHelper.random(units, game.side);
      for (var i = 0; i < units.length; i++) {
        this.placementHelper.setMapPosition(units[i], positions[i].x, positions[i].y);
        this.placementHelper.setPosition(units[i], positions[i].x, positions[i].y);
      }
      console.log(positions);
    }

}

export default UnitsManager;
