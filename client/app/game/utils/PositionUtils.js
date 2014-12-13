'use strict';

class PositionUtils {

	constructor(stateGame) {
		this.stateGame = stateGame;
	}

	getPositionOfAllUnits(){
        var allUnits = this.stateGame.spriteGroup.children;
        var allPosition = [];
        for (var i = 0; i < allUnits.length; i++) {
            allPosition.push(allUnits[i].content.position);
        }
        return allPosition;
    }

    getTileUnderPosition(x,y){
        return this.stateGame.layer.getTiles(x,y,2,2)[0];
    }

    getIndexesOfTileUnderPosition(x,y){
        var tile = this.stateGame.layer.getTiles(x,y,2,2)[0];
        if(tile !== undefined){
            return {'x' : tile.x, 'y' : tile.y};
        }
        return undefined;
    }

    isUnitUnder(pointer){
        var listSprite = this.stateGame.game.physics.arcade.getObjectsUnderPointer(pointer, this.stateGame.spriteGroup);
        
        if(listSprite === undefined || listSprite.length === 0){
        	var position = this.stateGame.positionUtils.getIndexesOfTileUnderPosition(pointer.x,pointer.y);
            if(position !== undefined){
            	var units = this.stateGame.positionUtils.getPositionOfAllUnits();
            	for (var i = 0; i < units.length; i++) {
            		if(units[i].x === position.x && units[i].y === position.y){
            			return {'unitUnder' : true, 'position' : null};
            		}
            	}
            	return {'unitUnder' : false, 'position' : position};
            }
            else{
            	return {'unitUnder' : true, 'position' : null};
            }
        	
        }
        else{
            return {'unitUnder' : true, 'position' : null};
        }
    }

}

export default PositionUtils;