'use strict';

import MapService from './MapService';
import GameController from '../controllers/GameController';

class InputService {

    onUnitDown(unit) {
      GameController.selectedUnit = unit;
      MapService.highlightUnitPossibleMoves(unit);
    }

    onFieldDown(tile) {
    	if (GameController.selectedUnit !== null && tile.tint !== 0xFFFFFF) {
    		MapService.move(GameController.selectedUnit, tile);
    		MapService.clean();
    	}
    }



}

export default new InputService();
