'use strict';

import Debugger from '../utils/Debugger';
import PositionChecker from '../utils/PositionChecker';

class CreationSprite {

  constructor(stateGame, debug) {
    this.stateGame = stateGame;
    this.debugUtils = new Debugger({'debug' : debug});
    this.positionUtils = new PositionChecker(debug);
  }

  // utils for 
  selectSpriteByName(spriteGroup,name) {
    this.debugUtils.print(name);
    // we need to look inside the list of units
    var allUnits = spriteGroup.children;
    for (var i = 0; i < allUnits.length; i++) {
      if(allUnits[i].name === name){
        this.selectSprite(allUnits[i]);
      }
    }
  }  

  // listener for selection of a sprite
  selectSprite(sprite, game, layer,spriteGroup, selectedSprite) {
    var that;

    // We get this object from context send with listener
    if(this.parent !== undefined){
      that = this.parent;
      game = this.game;
      layer = this.layer;
      spriteGroup = this.spriteGroup;
      selectedSprite = this.selectedSprite;
    }
    else{
      that = this;
    }

    selectedSprite = sprite;

    // we need to put the right listener for the exact moment or phase
    if(that.stateGame.placementUtils.finish) {
      game.input.onDown.add(that.moveSelected, {'parent' : that, 'game': game, 'layer' : layer, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite}, 0);
    }
  }

  moveSelected(pointer) {

    var that = this.parent;

    var game = this.game;
    var layer = this.layer;
    var spriteGroup = this.spriteGroup;
    var selectedSprite = this.selectedSprite;

    if (selectedSprite !== null) {
      
      // We check if a unit is under the pointer on this tile
      var result = that.stateGame.positionUtils.isUnitUnder(game, layer, spriteGroup, pointer);
      if(result.unitUnder){
        that.debugUtils.print('Destination impossible !');
      }
      else
      {
        that.debugUtils.print(result.position);
        that.stateGame.pathUtils.findPathTo(spriteGroup, selectedSprite, result.position.x,result.position.y);
        that.debugUtils.print('Mouvement réalisé !');
      }
      
      that.stateGame.selectedSprite = null;
      that.stateGame.mapUtils.removeEventListenerToMapPlacement(game);
    }
  }

  // to add sprite from passing position in tile index
  addSprite(options) {
    var tile = options.layer.getTiles(options.x,options.y,0,0);
    this.stateGame.spriteUtils.addSpriteWorld(options.game,tile[0].x, tile[0].y, tile[0].worldX, tile[0].worldY, null);
  }

  // to add sprite with position in world
  addSpriteWorld(game, x, y, worldX, worldY, unit) {
    var sprite = game.add.sprite(worldX, worldY, 'sprite_default');
    sprite.enableBody = true;

    sprite.content = unit;
    this.stateGame.spriteUtils.setPosition(sprite, x, y);
    sprite.name = sprite.content.name;
    this.debugUtils.print(sprite.content);
    this.debugUtils.print(sprite.name);

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

  addEventsListenerToSpriteSelect(sprite, game, layer, spriteGroup, selectedSprite) {
    sprite.events.onInputDown.add(this.selectSprite, {'parent' : this, 'game': game, 'layer' : layer, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite});
  }

  removeEventsListenerToSpriteSelect(sprite, game, layer, spriteGroup, selectedSprite) {
    sprite.events.onInputDown.remove(this.selectSprite, {'parent' : this, 'game': game, 'layer' : layer, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite});
  }

  setListenerSelectToAllUnits(game, layer, spriteGroup, selectedSprite) {
    for (var i = 0; i < spriteGroup.children.length; i++) {
      this.addEventsListenerToSpriteSelect(spriteGroup.children[i], game, layer, spriteGroup, selectedSprite);
    }
  }

  removeListenerSelectToAllUnits(game, layer, spriteGroup, selectedSprite) {
    for (var i = 0; i < spriteGroup.children.length; i++) {
      this.removeEventsListenerToSpriteSelect(spriteGroup.children[i], game, layer, spriteGroup, selectedSprite);
    }  
  }

  //OK
  setPosition(sprite, x, y){
    sprite.content.position = {'x' : x, 'y' : y};
  }
}

export default CreationSprite;