'use strict';

import InputService from '../services/InputService';

class Unit extends Phaser.Sprite {

    constructor(game, tile, data) {
        super(game, tile.position.x, tile.position.y, data.sprite || 'sprite_default', 0);
        this.tile = tile;

        this.id = data.id;
        this.name = data.name;
        this.life = data.life;
        this.moves = data.moves;
        this.stats = data.stats;
        this.weapon = data.weapon;
        this.isOwned = data.isOwned;

        this.inputEnabled = true;
        this.events.onInputDown.add(InputService.onUnitDown, this);
        game.add.existing(this);

        this.anchor.setTo(0.2, 0.2);

        this.animations.add('walk_right', [6,7,8,9]);
        this.animations.add('idle_right', [10, 11], 5, true, true);
        this.animations.add('idle_up',    [20, 21], 5, true, true);
        this.animations.add('idle_down',  [30, 31], 5, true, true);

        this.animations.play('idle_right');

    }

}

export default Unit;
