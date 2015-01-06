'use strict';

class Unit extends Phaser.Sprite {

    constructor(game, x, y, unit) {
        super(game, x, y, 'sprite_default', 0);
        this.id = unit.id;
        this.name = unit.name;

        this.enableBody = true;
        game.physics.enable(this);

        this.body.debug = true;
        this.scale.setTo(0.8);
        this.body.setSize(40,40);
        this.anchor.setTo(0,0.2);

        this.animations.add('bottom', [0], 10, true);
        this.animations.add('right', [1], 10, true);
        this.animations.add('top', [2], 10, true);
        this.animations.add('left', [3], 10, true);
        
        this.inputEnabled = true;

        if(this.x > (game.world.width/2)) {
            this.animations.play('left');
        }
        else{
            this.animations.play('right');
        }

        game.add.existing(this);
    }

}

export default Unit;
