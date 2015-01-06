'use strict';

import MapService from './MapService';

class InputService {

    constructor() {
      this.selectedUnit = null;
    }

    onUnitDown(unit) {
      if (unit !== this.selectedUnit) {
        this.selectedUnit = unit;
      }
      MapService.highlightUnitPossibleMoves(unit);
    }



}

export default new InputService();
