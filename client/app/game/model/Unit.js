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
    }

}

export default Unit;
