'use strict';

class SpriteUtils {

  constructor(stateGame) {
    console.log(stateGame);
    console.log(stateGame.game);
    this.stateGame = stateGame;
  }

  selectSprite(sprite) {
    console.log(this);

    this.stateGame.selectedSprite = sprite;
    this.stateGame.game.input.onDown.add(this.stateGame.spriteUtils.moveSelected, this.stateGame.spriteUtils, 0);
  }

  moveSelected(pointer) {
    //console.log(selectedSprite);
    if (this.stateGame.selectedSprite !== null) { 
      this.stateGame.selectedSprite.x = pointer.x;
      this.stateGame.selectedSprite.y = pointer.y;
      this.stateGame.selectedSprite = null;
      this.stateGame.game.input.onDown.remove(this.stateGame.spriteUtils.moveSelected, this.stateGame.spriteUtils);

      //game.input.onDown.removeAll();
    }
  }

  addSprite(){
    var sprite;

    sprite = this.stateGame.game.add.sprite(50, this.stateGame.game.world.height - 80, 'nigga');
    sprite.enableBody = true;

    this.stateGame.game.physics.enable(sprite);

    sprite.body.debug = true;

    sprite.body.setSize(24,24);
    sprite.anchor.setTo(0.5,1.1);

    sprite.animations.add('bottom', [0], 10, true);
    sprite.animations.add('right', [1], 10, true);
    sprite.animations.add('top', [2], 10, true);
    sprite.animations.add('left', [3], 10, true);
    
    sprite.body.collideWorldBounds = true;
    
    sprite.inputEnabled = true;

    sprite.animations.play('right');

    sprite.events.onInputDown.add(this.stateGame.spriteUtils.selectSprite, this.stateGame.spriteUtils);

    return sprite;
  }

}

export default SpriteUtils;