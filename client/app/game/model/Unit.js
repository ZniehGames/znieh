'use strict';

import InputService from '../services/InputService';

class Unit extends Phaser.Sprite {

    constructor(game, x, y, unit) {
        super(game, x, y, 'sprite_default', 0);
        this.id = unit.id;
        this.name = unit.name;
        this.life = unit.life;
        this.moves = unit.moves || 4;
        this.inputEnabled = true;
        this.events.onInputDown.add(InputService.onUnitDown, this);
        game.add.existing(this);
    }

}

export default Unit;
