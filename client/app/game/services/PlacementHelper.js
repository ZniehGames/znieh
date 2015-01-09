'use strict';

import CheckerHelper from '../services/CheckerHelper';
import PathHelper from '../services/PathHelper';

class PlacementHelper {

    constructor(){
      this.checkerHelper = new CheckerHelper();
      this.pathHelper = new PathHelper();
    }

    random(units, side, layer) {
      layer = layer.layer.data;
      var positions = [];
      var x, y;
      units.forEach(function() {
        do {
          x = Math.floor((Math.random() * 5));
          y = Math.floor((Math.random() * 10) +2);
          if (side === 'right') {
            x += 20;
          }
        } while(layer[y][x].collides || !positions.indexOf({'x': x, 'y': y}) );
        positions.push({'x': x, 'y': y});
      });
      return positions;
    }

    // listener for selection of a sprite
    selectSprite(sprite, game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked) {
      var that;

      // We get this object from context send with listener
      if(this.parent !== undefined){
        game = this.game;
        layer = this.layer;
        spriteGroup = this.spriteGroup;
        selectedSprite = this.selectedSprite;
        tileBlocked = this.tileBlocked;
        tilemap = this.tilemap;
        that = this.parent;
      }
      else{
        that = this;
      }

      if(!that.pathHelper.initialized){
        that.pathHelper.init(game, tilemap, tileBlocked);
      }

      selectedSprite = sprite;

      game.input.onDown.add(that.moveSelected, {'parent' : that, 'game': game, 'layer' : layer, 'tilemap' : tilemap, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite, 'tileBlocked' : tileBlocked}, 0);
    }

    moveSelected(pointer) {

      var that = this.parent;
      var game = this.game;
      var side = game.side;
      var layer = this.layer;
      var spriteGroup = this.spriteGroup;
      var selectedSprite = this.selectedSprite;

      if (selectedSprite !== null) {
        
        // We check if a unit is under the pointer on this tile
        var result = that.checkerHelper.isUnitUnder(game, layer, spriteGroup, pointer);
        if(result.unitUnder){
          console.log('Destination impossible !');
        }
        else
        {
          var position = result.position;
          console.log(position);
          if (side === 'left' && position.x <= 4) {
            that.pathHelper.findPathTo(game, spriteGroup, selectedSprite, result.position.x,result.position.y);
            console.log('Mouvement réalisé !');
          }
          else if(side === 'right' && position.x >= 20){
            that.pathHelper.findPathTo(game, spriteGroup, selectedSprite, result.position.x,result.position.y);
            console.log('Mouvement réalisé !');
          }
          else{
            console.log('Destination impossible !');  
          } 
        }
        game.input.onDown.removeAll();
        that.selectedSprite = null;
      }
    }

    addEventsListenerToSpriteSelect(sprite, game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked) {
      sprite.events.onInputDown.add(this.selectSprite, {'parent' : this, 'game': game, 'layer' : layer, 'tilemap' : tilemap, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite, 'tileBlocked' : tileBlocked});
    }

    removeEventsListenerToSpriteSelect(sprite, game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked) {
      sprite.events.onInputDown.remove(this.selectSprite, {'parent' : this, 'game': game, 'layer' : layer, 'tilemap' : tilemap, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite, 'tileBlocked' : tileBlocked});
    }

    setListenerSelectToAllUnits(game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked
      ) {
      for (var i = 0; i < spriteGroup.children.length; i++) {
        this.addEventsListenerToSpriteSelect(spriteGroup.children[i], game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked);
      }
    }

    removeListenerSelectToAllUnits(game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked) {
      for (var i = 0; i < spriteGroup.children.length; i++) {
        this.removeEventsListenerToSpriteSelect(spriteGroup.children[i], game, layer, tilemap, spriteGroup, selectedSprite, tileBlocked);
      }  
    }
}

export default PlacementHelper;
