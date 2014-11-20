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
    	var tile = this.stateGame.layer.getTiles(pointer.x,pointer.y,0,0,false);
    	console.log(tile);
    	//var optionsPlacement = {'placement' : { 'x' : tile[0].worldX+tile[0].centerX, 'y' : tile[0].worldY+tile[0].centerY}};
    	var optionsPlacement = {'placement' : { 'x' : tile[0].worldX, 'y' : tile[0].worldY}};
    	this.stateGame.spriteUtils.addSprite(optionsPlacement);
    	//this.removeEventListenerToMap();
    }
}

export default MapUtils;
