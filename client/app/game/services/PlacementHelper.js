'use strict';

class PlacementHelper {

    random(units, side) {
      var positions = [];
      var x, y;
      units.forEach(function() {
        do {
          x = Math.floor((Math.random() * 5));
          y = Math.floor((Math.random() * 10) +2);
          if (side === 'right') {
            x += 21; //20
          }
         } while(!positions.indexOf({'x': x, 'y': y}));
        positions.push({'x': x, 'y': y});
      });
      return positions;
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

    setPosition(sprite, x, y){
      sprite.x = x*32;
      sprite.y = y*32;
    }

    setMapPosition(sprite, x, y){
      sprite.mapPosition = {'x' : x, 'y' : y};
    }
}

export default PlacementHelper;
