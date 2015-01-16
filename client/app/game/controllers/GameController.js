'use strict';

class GameController {

    constructor() {
      this.selectedUnit = null;
      this.units = [];
    }

    findUnitById(id) {
      for (var i = 0; i < this.units.length; i++) {
        if (this.units[i].id === id) {
          return this.units[i];
        }
      }
    }

}

export default new GameController();
