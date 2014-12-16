'use strict';

class Unit extends Phaser.Sprite {

    constructor(game, x, y, unit) {
        super(game, x, y, 'sprite_default', 0);

        this.name = unit.name;

        this.anchor.setTo(0.5, 0);
        // this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
        game.add.existing(this);
    }

}

export default Unit;
