'use strict';

import InputService from '../services/InputService';

class Unit extends Phaser.Sprite {

    constructor(game, tile, data) {
        super(game, tile.position.x, tile.position.y, 'units');
        this.tile = tile;
        this.id = data.id;
        this.name = data.name;
        this.life = data.life;
        this.maxLife = data.life;
        this.moves = data.moves;
        this.stats = data.stats;
        this.weapon = data.weapon;
        this.isOwned = data.isOwned;
        this.sprite = data.sprite;

        this.isAlive = function() {
            return this.life > 0;
        };

        this.inputEnabled = true;
        this.events.onInputDown.add(InputService.onUnitDown, this);
        game.add.existing(this);

        this.anchor.setTo(0.2, 0.2);

        this.animations.add('atk_up', Phaser.Animation.generateFrameNames(this.sprite.name    + '/atk_up/',  0, 4, '.png', 2), 5, true);
        this.animations.add('walk_up',Phaser.Animation.generateFrameNames(this.sprite.name    + '/walk_up/', 0, 3, '.png', 2), 5, true);
        this.animations.add('idle_up',Phaser.Animation.generateFrameNames(this.sprite.name    + '/idle_up/', 0, 1, '.png', 2), 5, true);

        this.animations.add('atk_down', Phaser.Animation.generateFrameNames(this.sprite.name  + '/atk_down/',  0, 4, '.png', 2), 5, true);
        this.animations.add('walk_down',Phaser.Animation.generateFrameNames(this.sprite.name  + '/walk_down/', 0, 3, '.png', 2), 5, true);
        this.animations.add('idle_down',Phaser.Animation.generateFrameNames(this.sprite.name  + '/walk_down/', 0, 1, '.png', 2), 5, true);

        this.animations.add('atk_right', Phaser.Animation.generateFrameNames(this.sprite.name + '/atk_right/',  0, 4, '.png', 2), 5, true);
        this.animations.add('walk_right',Phaser.Animation.generateFrameNames(this.sprite.name + '/walk_right/', 0, 3, '.png', 2), 5, true);
        this.animations.add('idle_right',Phaser.Animation.generateFrameNames(this.sprite.name + '/idle_right/', 0, 1, '.png', 2), 5, true);

        this.animations.add('atk_left', Phaser.Animation.generateFrameNames(this.sprite.name  + '/atk_left/',  0, 4, '.png', 2), 5, true);
        this.animations.add('walk_left',Phaser.Animation.generateFrameNames(this.sprite.name  + '/walk_left/', 0, 3, '.png', 2), 5, true);
        this.animations.add('idle_left',Phaser.Animation.generateFrameNames(this.sprite.name  + '/idle_left/', 0, 1, '.png', 2), 5, true);

        if (tile.indexes.x < 10){
            this.animations.play('idle_right');
        } else {
            this.animations.play('idle_left');
        }
    }

}

export default Unit;
