'use strict';

import TweenService from './TweenService';
import GameController from '../controllers/GameController';

class FightService {

    constructor() {
      this.io = null;
    }

    init(io, $scope) {
      this.io = io;
      this.$scope = $scope;
    }

    attack(attacker, defender) {
      this.io.emit('attack', {
        'attacker': attacker.id,
        'defender': defender.id
      });
    }

    attacked(data) {
      var attacker = GameController.findUnitById(data.attacker.id);
      var defender = GameController.findUnitById(data.defender.id);

      TweenService.attack(attacker, defender, data.dammage, () => {
        defender.life = data.defender.life;
        if (defender.life <= 0) {
          defender.kill();
        }
        this.$scope.$digest();
      });
    }

}

export default new FightService();
