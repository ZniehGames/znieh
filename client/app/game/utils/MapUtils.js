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

    addEventListenerToMap(){
    	this.stateGame.game.input.onDown.add(this.stateGame.mapUtils.selectTilePlacement, this.stateGame.mapUtils, 0);
    }

    removeEventListenerToMap(){
    	this.stateGame.game.input.onDown.remove(this.stateGame.mapUtils.selectTilePlacement, this.stateGame.mapUtils);
    }

    selectTilePlacement(pointer)
    {
    	// We check if a sprite is not under the pointer
    	var under = this.stateGame.game.physics.arcade.getObjectsUnderPointer(pointer, this.stateGame.spriteGroup);
    	
    	if(under === undefined || under.length === 0) {
    		// We take the tile selected for ckeck collision and get his position  
	    	var tile = this.stateGame.layer.getTiles(pointer.x,pointer.y,0,0);
	    	tile = tile[0];
	    	if(tile.collides) {
	    		console.log('Vous ne pouvez pas le placer ici ;)');
	    	}
	    	else{
		    	var optionsPlacement = {'placement' : { 'x' : tile.worldX, 'y' : tile.worldY}};
		    	this.stateGame.spriteUtils.addSprite(optionsPlacement);
	    	}
	    	//this.removeEventListenerToMap();
    	}
    	else {
    		console.log('under was not empty or undefined...');
    	}
    }
}

export default MapUtils;
