'use strict';

class CheckHelper {

	getPositionOfAllUnits(spriteGroup){
        var allUnits = spriteGroup.children;
        var allPosition = [];
        for (var i = 0; i < allUnits.length; i++) {
            allPosition.push(allUnits[i].mapPosition);
        }
        return allPosition;
    }

    getTileUnderPosition(layer,x,y){
        return layer.getTiles(x,y,2,2)[0];
    }

    getIndexesOfTileUnderPosition(layer,x,y){
        var tile = layer.getTiles(x,y,2,2)[0];
        if(tile !== undefined){
            return {'x' : tile.x, 'y' : tile.y};
        }
        return undefined;
    }

    isUnitUnder(game, layer, spriteGroup, pointer){
        var listSprite = game.physics.arcade.getObjectsUnderPointer(pointer, spriteGroup);
        
        if(listSprite === undefined || listSprite.length === 0){
        	var position = this.getIndexesOfTileUnderPosition(layer,pointer.x,pointer.y);
            if(position !== undefined){
            	var units = this.getPositionOfAllUnits(spriteGroup);
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

export default CheckHelper;
