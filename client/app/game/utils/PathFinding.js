'use strict';

import Debugger from '../utils/Debugger';
import PositionChecker from '../utils/PositionChecker';

class PathFinding {

	constructor(stateGame, debug) {
        this.stateGame = stateGame;
        this.debugUtils = new Debugger({'debug' : debug});
        this.positionUtils = new PositionChecker(debug);
        this.walkables = null;
    }

	init(game, map, tileBlocked) {
		this.walkables = this.stateGame.mapUtils.getWalkablesTiles(tileBlocked, game);
        this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(map.layers[0].data, this.walkables);
	}

    findPathTo(spriteGroup, selectedSprite, tilex, tiley) {
        var stateGame = this.stateGame;
        var sizeOfTile = 32;
        var pathOfUnit = null;
        var tween = null;
        var speed = 150;
        var additionnalPoints = this.positionUtils.getPositionOfAllUnits(spriteGroup);

        this.debugUtils.print(spriteGroup);
        this.debugUtils.print(selectedSprite);

        for (var i = 0; i < additionnalPoints.length; i++) {
            this.pathfinder._easyStar.avoidAdditionalPoint(additionnalPoints[i].x,additionnalPoints[i].y);
        }
        
        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            path.shift();
            stateGame.debugUtils.print(path);
            tween = stateGame.game.add.tween(selectedSprite);
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                //stateGame.selectedSprite.x = path[i].x*sizeOfTile;
                //stateGame.selectedSprite.y = path[i].y*sizeOfTile;
                tween.to({x: path[i].x*sizeOfTile, y: path[i].y*sizeOfTile}, speed, Phaser.Easing.Linear.None); // in this case we don't predefine the tween (but works the same way)
            }
            var blocked;
            blocked = false;
            pathOfUnit = path;
        });

        this.pathfinder.preparePathCalculation([selectedSprite.content.position.x,selectedSprite.content.position.y], [tilex,tiley]);
        this.pathfinder.calculatePath();

        if(pathOfUnit.length !== 0){
            tween.start();
            this.stateGame.spriteUtils.setPosition(selectedSprite,tilex,tiley);
        }
        else{
            this.debugUtils.print('chemin vide, impossible d\'y aller');
        }

        this.pathfinder._easyStar.stopAvoidingAllAdditionalPoints();
    }

}

export default PathFinding;