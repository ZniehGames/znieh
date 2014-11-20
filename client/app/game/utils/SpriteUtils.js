'use strict';

class SpriteUtils {

  constructor(stateGame) {
    this.stateGame = stateGame;
  }

  selectSprite(sprite) {
    this.stateGame.selectedSprite = sprite;
    this.stateGame.game.input.onDown.add(this.stateGame.spriteUtils.moveSelected, this.stateGame.spriteUtils, 0);
  }

  moveSelected(pointer) {
    if (this.stateGame.selectedSprite !== null) { 
      this.stateGame.selectedSprite.x = pointer.x;
      this.stateGame.selectedSprite.y = pointer.y;
      this.stateGame.selectedSprite = null;
      this.stateGame.game.input.onDown.remove(this.stateGame.spriteUtils.moveSelected, this.stateGame.spriteUtils);
    }
  }

  addSprite(options){
    var sprite;

    //console.log(options);
    sprite = this.stateGame.game.add.sprite(options.placement.x, options.placement.y, 'nigga');
    sprite.enableBody = true;

    this.stateGame.game.physics.enable(sprite);

    sprite.body.debug = true;

    sprite.scale.setTo(0.8);
    sprite.body.setSize(40,40);
    sprite.anchor.setTo(0,0.2);

    sprite.animations.add('bottom', [0], 10, true);
    sprite.animations.add('right', [1], 10, true);
    sprite.animations.add('top', [2], 10, true);
    sprite.animations.add('left', [3], 10, true);
    
    sprite.body.collideWorldBounds = true;
    
    sprite.inputEnabled = true;

    if(sprite.x > (this.stateGame.game.world.width/2)){
      sprite.animations.play('left');
    }
    else{
      sprite.animations.play('right');
    }


    //this.addEventsListenerToSprite(sprite);

    this.stateGame.spriteLists.push(sprite);

    this.stateGame.spriteGroup.add(sprite);
  }

  addEventsListenerToSprite(sprite) {
    sprite.events.onInputDown.add(this.stateGame.spriteUtils.selectSprite, this.stateGame.spriteUtils);
  }

}

export default SpriteUtils;