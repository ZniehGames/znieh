'use strict';

class SpriteUtils {

  constructor(stateGame) {
    this.stateGame = stateGame;
  }

  // utils for 
  selectSpriteByName(name) {
    this.stateGame.debugUtils.print(name);
    // we need to look inside the list of units
    this.selectSprite();
  }  

  // listener for selection of a sprite
  selectSprite(sprite) {
    this.stateGame.selectedSprite = sprite;
    
    // we need to put the right listener for the exact moment or phase
    if(this.stateGame.placementUtils.finish) {
      this.stateGame.game.input.onDown.add(this.stateGame.spriteUtils.moveSelected, this.stateGame.spriteUtils, 0);
    }
  }

  moveSelected(pointer) {
    if (this.stateGame.selectedSprite !== null) { 

      var position = this.stateGame.mapUtils.getIndexesOfTileUnderPosition(pointer.x, pointer.y);
      if(position !== undefined){
        this.stateGame.debugUtils.print(position);
        this.stateGame.debugUtils.print(pointer);
        this.stateGame.pathUtils.findPathTo(position.x,position.y);

        this.stateGame.selectedSprite = null;
        this.stateGame.mapUtils.removeEventListenerToMapPlacement();
        //this.removeListenerSelectToAllUnits();        
      }
      else{
        this.stateGame.debugUtils.print('Aucune tile n\'a été trouvée !');
      }
    }
  }

  // to add sprite from passing position in tile index
  addSprite(options) {
    var tile = this.stateGame.layer.getTiles(options.x,options.y,0,0);
    var optionsPlacement = {'placement' : { 'x' : tile[0].x, 'y' : tile[0].y, 'worldX' : tile[0].worldX, 'worldY' : tile[0].worldY, 'unit' : null}};
    this.stateGame.spriteUtils.addSpriteWorld(optionsPlacement);
  }

  // to add sprite with position in world
  addSpriteWorld(options) {
    var sprite = this.stateGame.game.add.sprite(options.placement.worldX, options.placement.worldY, 'sprite_default');
    sprite.enableBody = true;

    sprite.content = options.placement.unit;
    this.stateGame.spriteUtils.setPosition(sprite, options.placement.x, options.placement.y);
    sprite.name = sprite.content.name;
    this.stateGame.debugUtils.print(sprite.content);
    this.stateGame.debugUtils.print(sprite.name);

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

    if(sprite.x > (this.stateGame.game.world.width/2)) {
      sprite.animations.play('left');
    }
    else{
      sprite.animations.play('right');
    }

    this.stateGame.spriteLists.push(sprite);
    this.stateGame.spriteGroup.add(sprite);
  }

  addEventsListenerToSpriteSelect(sprite) {
    sprite.events.onInputDown.add(this.stateGame.spriteUtils.selectSprite, this.stateGame.spriteUtils);
  }

  removeEventsListenerToSpriteSelect(sprite) {
    sprite.events.onInputDown.remove(this.stateGame.spriteUtils.selectSprite, this.stateGame.spriteUtils);
  }

  setListenerSelectToAllUnits() {
    this.stateGame.spriteLists.forEach(this.stateGame.spriteUtils.addEventsListenerToSpriteSelect, this);
  }

  removeListenerSelectToAllUnits() {
    this.stateGame.spriteLists.forEach(this.stateGame.spriteUtils.removeEventsListenerToSpriteSelect, this);
  }

  setPosition(sprite, x, y){
    sprite.content.position = {'x' : x, 'y' : y};
  }

  setPositionSelected(x, y){
    this.stateGame.selectedSprite.content.position = {'x' : x, 'y' : y};
  }
}

export default SpriteUtils;