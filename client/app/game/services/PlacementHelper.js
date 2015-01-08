'use strict';

import CheckerHelper from '../services/CheckerHelper';
import PathHelper from '../services/PathHelper';

class PlacementHelper {

    constructor(){
      console.log();
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
        } while(!positions.indexOf({'x': x, 'y': y}) && layer[y][x].collides);
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
        that.pathHelper.init(game, layer, tileBlocked);
      }

      selectedSprite = sprite;

      game.input.onDown.add(that.moveSelected, {'parent' : that, 'game': game, 'layer' : layer, 'tilemap' : tilemap, 'spriteGroup' : spriteGroup, 'selectedSprite' : selectedSprite, 'tileBlocked' : tileBlocked}, 0);
    }

    moveSelected(pointer) {

      var that = this.parent;

      var game = this.game;
      //var layer = this.layer;
      var spriteGroup = this.spriteGroup;
      var selectedSprite = this.selectedSprite;
      var tilemap = this.tilemap;

      if (selectedSprite !== null) {
        
        // We check if a unit is under the pointer on this tile
        var result = that.checkerHelper.isUnitUnder(game, tilemap, spriteGroup, pointer);
        if(result.unitUnder){
          console.log('Destination impossible !');
        }
        else
        {
          console.log(result.position);
          that.pathHelper.findPathTo(game, spriteGroup, selectedSprite, result.position.x,result.position.y);
          console.log('Mouvement réalisé !');
        }
        
        that.selectedSprite = null;
        that.mapUtils.removeEventListenerToMapPlacement(game);
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
