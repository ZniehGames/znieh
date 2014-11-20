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
    	this.stateGame.game.input.onDown.add(this.stateGame.mapUtils.selectTile, this.stateGame.mapUtils, 0);
    }

    removeEventListenerToMap(){
    	this.stateGame.game.input.onDown.remove(this.stateGame.mapUtils.selectTile, this.stateGame.mapUtils);
    }

    selectTile(pointer)
    {
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
}

export default MapUtils;
