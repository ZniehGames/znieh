'use strict';

class MapUtils {

	constructor(stateGame) {
		this.stateGame = stateGame;
	}

    getBlockedTiles() {
    	var map = this.stateGame.game.cache.getTilemapData('map').data;
        var result = Object.keys(map.tilesets[0].tileproperties);
        var arrayInt = [];

        function toInt(element) {
          arrayInt.push(parseInt(element));
        }
        result.forEach(toInt);
        return arrayInt;
    }

    getWalkablesTiles(blockedTiles) {
        var map = this.stateGame.game.cache.getTilemapData('map').data;
        var result = map.layers[0].data;
        var newarr = [];
                
        for (var i = 0; i < result.length; i++) {
            if(blockedTiles.indexOf(result[i]) === -1 && newarr.indexOf(result[i]) === -1){
                newarr.push(result[i]);
            }
        }
        return newarr;
    }

    addEventListenerToMapPlacement(){
    	this.stateGame.game.input.onDown.add(this.stateGame.mapUtils.selectTilePlacement, this.stateGame.mapUtils, 0);
    }

    removeEventListenerToMapPlacement(){
    	this.stateGame.game.input.onDown.remove(this.stateGame.mapUtils.selectTilePlacement, this.stateGame.mapUtils);
    }

    // select tile and place unit to it position if possible
    selectTilePlacement(pointer)
    {
    	// We check if a sprite is not under the pointer
        // Seems to not works the same way..
        if(this.stateGame.positionUtils.isUnitUnder(pointer).unitUnder) {
            this.stateGame.debugUtils.print('there is a unit under this point...');
        }
        else {
    		// We take the tile selected for ckeck collision and get his position  
            var tile = this.stateGame.positionUtils.getTileUnderPosition(pointer.x, pointer.y);           
            if(this.stateGame.placementUtils.canPlace(tile.x, tile.collides)) {
                var optionsPlacement = {'placement' : { 'x' : tile.x, 'y' : tile.y, 'worldX' : tile.worldX, 'worldY' : tile.worldY, 'unit' : this.stateGame.placementUtils.getUnitToPlace()}};
                this.stateGame.spriteUtils.addSpriteWorld(optionsPlacement);
                
                this.stateGame.debugUtils.print(tile.x + ' x and y ' + tile.y);  
                // TODO To send to server

                //we decrease the number of units to place
                this.stateGame.placementUtils.goOnPlacement();
            }
            else{
                this.stateGame.debugUtils.print('Vous ne pouvez pas le placer ici ;)');
            }
        }
    }
}

export default MapUtils;
