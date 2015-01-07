'use strict';

import CheckerHelper from '../services/CheckerHelper';

class PathHelper {

	constructor() {
        this.checkerHelper = new CheckerHelper();
        this.walkables = null;
    }

	init(game, map, tileBlocked) {
		this.walkables = this.stateGame.mapUtils.getWalkablesTiles(tileBlocked, game);
        this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(map.layers[0].data, this.walkables);
	}

    findPathTo(game, spriteGroup, selectedSprite, tilex, tiley) {
        var sizeOfTile = 32;
        var pathOfUnit = null;
        var tween = null;
        var speed = 150;
        var additionnalPoints = this.checkerHelper.getPositionOfAllUnits(spriteGroup);

        console.log(spriteGroup);
        console.log(selectedSprite);

        for (var i = 0; i < additionnalPoints.length; i++) {
            this.pathfinder._easyStar.avoidAdditionalPoint(additionnalPoints[i].x,additionnalPoints[i].y);
        }
        
        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            path.shift();
            tween = game.add.tween(selectedSprite);
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
            console.log('chemin vide, impossible d\'y aller');
        }

        this.pathfinder._easyStar.stopAvoidingAllAdditionalPoints();
    }
}

export default PathHelper;