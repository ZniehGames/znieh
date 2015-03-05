'use strict';

import MapService from './MapService';
import FightService from './FightService';
import GameController from '../controllers/GameController';

class InputService {

    onUnitDown(unit) {
      if (unit.isOwned) {
        GameController.selectUnit(unit);
        MapService.highlightUnitPossibleMoves(unit);
        return;
      }
      if (GameController.selectedUnit !== null) {
        FightService.attack(GameController.selectedUnit, unit);
      }
    }

    onFieldDown(tile) {
    	if (GameController.selectedUnit !== null && tile.tint !== 0xFFFFFF) {
    		MapService.move(GameController.selectedUnit, tile);
    		MapService.clean();
    	}
    }



}

export default new InputService();
