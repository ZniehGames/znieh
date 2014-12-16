'use strict';

import Debugger from '../utils/Debugger';
import PositionChecker from '../utils/PositionChecker';

class Map {

	constructor(stateGame, debug) {
		this.stateGame = stateGame;
        this.debugUtils = new Debugger({'debug' : debug});
        this.positionUtils = new PositionChecker(debug);
	}

    getBlockedTiles(game) {
    	var map = game.cache.getTilemapData('map').data;
        var result = Object.keys(map.tilesets[0].tileproperties);
        var arrayInt = [];

        function toInt(element) {
          arrayInt.push(parseInt(element));
        }
        result.forEach(toInt);
        return arrayInt;
    }

    getWalkablesTiles(blockedTiles, game) {
        var map = game.cache.getTilemapData('map').data;
        var result = map.layers[0].data;
        var newarr = [];
                
        for (var i = 0; i < result.length; i++) {
            if(blockedTiles.indexOf(result[i]) === -1 && newarr.indexOf(result[i]) === -1){
                newarr.push(result[i]);
            }
        }
        return newarr;
    }

    addEventListenerToMapPlacement(game, layer, spriteGroup){
    	game.input.onDown.add(this.selectTilePlacement, {'this' : this, 'game': game, 'layer' : layer, 'spriteGroup' : spriteGroup}, 0);
    }

    removeEventListenerToMapPlacement(game){
        game.input.onDown.removeAll();
    }

    // select tile and place unit to it position if possible
    selectTilePlacement(pointer, layer, game, spriteGroup, selectedSprite)
    {
    	// We check if a sprite is not under the pointer
        // Seems to not works the same way..
        if(this.positionUtils.isUnitUnder(game, layer, spriteGroup, pointer).unitUnder) {
            this.stateGame.debugUtils.print('there is a unit under this point...');
        }
        else {
    		// We take the tile selected for ckeck collision and get his position  
            var tile = this.positionUtils.getTileUnderPosition(layer, pointer.x, pointer.y);           
            if(this.stateGame.placementUtils.canPlace(tile.x, tile.collides)) {
                this.stateGame.spriteUtils.addSpriteWorld(game, tile.x, tile.y, tile.worldX, tile.worldY, this.stateGame.placementUtils.getUnitToPlace());
                this.debugUtils.print(tile.x + ' x and y ' + tile.y);  
                //we decrease the number of units to place
                this.stateGame.placementUtils.goOnPlacement(game, layer, spriteGroup, selectedSprite);
            }
            else{
                this.debugUtils.print('Vous ne pouvez pas le placer ici ;)');
            }
        }
    }
}

export default Map;
