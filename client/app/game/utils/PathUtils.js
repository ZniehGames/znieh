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

    findPathTo(tilex, tiley) {
        var stateGame = this.stateGame;
        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            stateGame.debugUtils.print(path);
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                stateGame.selectedSprite.x = path[i].x*32;
                stateGame.selectedSprite.y = path[i].y*32;
           	}
            var blocked;
            blocked = false;
        });

        this.pathfinder.preparePathCalculation([0,0], [tilex,tiley]);
        this.pathfinder.calculatePath();
    }

}

export default PathUtils;