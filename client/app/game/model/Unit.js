'use strict';

class Unit extends Phaser.Sprite {

    constructor(game, x, y, unit) {
        super(game, x, y, 'sprite_default', 0);

        this.name = unit.name;
        game.add.existing(this);
    }

}

export default Unit;
