'use strict';

class PathUtils {

	constructor(stateGame) {
		this.stateGame = stateGame;
	}

	init() {
		this.walkables = this.stateGame.mapUtils.getWalkablesTiles(this.stateGame.tileBlocked);
        this.pathfinder = this.stateGame.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.stateGame.map.layers[0].data, this.walkables);
	}

    getPositionOfAllUnits(){
        var allUnits = this.stateGame.spriteGroup.children;
        var allPosition = [];
        for (var i = 0; i < allUnits.length; i++) {
            allPosition.push(allUnits[i].content.position);
        }
        return allPosition;
    }

    findPathTo(tilex, tiley) {
        var stateGame = this.stateGame;
        var sizeOfTile = 32;
        var pathOfUnit = null;
        var additionnalPoints = this.stateGame.pathUtils.getPositionOfAllUnits();

        for (var i = 0; i < additionnalPoints.length; i++) {
            this.pathfinder._easyStar.avoidAdditionalPoint(additionnalPoints[i].x,additionnalPoints[i].y);
        }
        
        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            path.shift();
            stateGame.debugUtils.print(path);
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                stateGame.selectedSprite.x = path[i].x*sizeOfTile;
                stateGame.selectedSprite.y = path[i].y*sizeOfTile;
           	}
            var blocked;
            blocked = false;
            pathOfUnit = path;
        });

        this.pathfinder.preparePathCalculation([stateGame.selectedSprite.content.position.x,stateGame.selectedSprite.content.position.y], [tilex,tiley]);
        this.pathfinder.calculatePath();

        if(pathOfUnit.length !== 0){
            this.stateGame.spriteUtils.setPositionSelected(tilex,tiley);
        }
        else{
            stateGame.debugUtils.print('chemin vide, impossible d\'y aller');
        }

        this.pathfinder._easyStar.stopAvoidingAllAdditionalPoints();
    }

}

export default PathUtils;