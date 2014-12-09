'use strict';

class PathUtils {

	constructor(stateGame) {
		this.stateGame = stateGame;
	}

	init() {
		this.walkables = this.stateGame.mapUtils.getWalkablesTiles(this.stateGame.tileBlocked);
        this.pathfinder = this.stateGame.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(this.stateGame.map.layers[0].data, this.walkables);
        this.stateGame.debugUtils.print(this.walkables);
	}

    findPathTo(tilex, tiley) {
        var stateGame = this.stateGame;
        var sizeOfTile = 32;
        var pathOfUnit = null;

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
    }

}

export default PathUtils;