'use strict';

class GameController {

    constructor() {
      this.selectedUnit = null;
      this.units = [];
    }

    init($scope) {
      this.$scope = $scope;
    }

    selectUnit(unit) {
      for (var i = this.units.length - 1; i >= 0; i--) {
        if (this.units[i].id === unit.id) {
          this.units[i].selected = true;
        } else {
          this.units[i].selected = false;
        }
      }
      this.selectedUnit = unit;
      this.$scope.$digest();
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
