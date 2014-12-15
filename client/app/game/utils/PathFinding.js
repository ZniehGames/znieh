'use strict';

class PathFinding {

	constructor(stateGame) {
		this.stateGame = stateGame;
	}

	init() {
		this.walkables = this.stateGame.mapUtils.getWalkablesTiles(this.stateGame.tileBlocked);
        this.pathfinder = this.stateGame.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.stateGame.map.layers[0].data, this.walkables);
	}

    findPathTo(tilex, tiley) {
        var stateGame = this.stateGame;
        var sizeOfTile = 32;
        var pathOfUnit = null;
        var tween = null;
        var speed = 150;
        var additionnalPoints = this.stateGame.positionUtils.getPositionOfAllUnits();

        for (var i = 0; i < additionnalPoints.length; i++) {
            this.pathfinder._easyStar.avoidAdditionalPoint(additionnalPoints[i].x,additionnalPoints[i].y);
        }
        
        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            path.shift();
            stateGame.debugUtils.print(path);
            tween = stateGame.game.add.tween(stateGame.selectedSprite);
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                //stateGame.selectedSprite.x = path[i].x*sizeOfTile;
                //stateGame.selectedSprite.y = path[i].y*sizeOfTile;
                tween.to({x: path[i].x*sizeOfTile, y: path[i].y*sizeOfTile}, speed, Phaser.Easing.Linear.None); // in this case we don't predefine the tween (but works the same way)
            }
            var blocked;
            blocked = false;
            pathOfUnit = path;
        });

        this.pathfinder.preparePathCalculation([stateGame.selectedSprite.content.position.x,stateGame.selectedSprite.content.position.y], [tilex,tiley]);
        this.pathfinder.calculatePath();

        if(pathOfUnit.length !== 0){
            tween.start();
            this.stateGame.spriteUtils.setPositionSelected(tilex,tiley);
        }
        else{
            stateGame.debugUtils.print('chemin vide, impossible d\'y aller');
        }

        this.pathfinder._easyStar.stopAvoidingAllAdditionalPoints();
    }

}

export default PathFinding;