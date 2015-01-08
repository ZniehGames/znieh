'use strict';

import CheckerHelper from '../services/CheckerHelper';
import PositionSeter from '../services/PositionSeter';
import Map from '../model/Map';

class PathHelper {

	constructor() {
        this.checkerHelper = new CheckerHelper();
        this.mapUtils = new Map();
        this.positionSeter = new PositionSeter();
        this.walkables = null;
        this.initialized = false;
    }

	init(game, tilemap, tileBlocked) {
		this.walkables = this.mapUtils.getWalkablesTiles(tileBlocked, game);
        this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);

        console.log(this.walkables);
        console.log('tilemap',tilemap);
        console.log('tilemap data',tilemap.layers[0].data);

        this.pathfinder.setGrid(tilemap.layers[0].data, this.walkables);
        this.initialized = true;
    }

    findPathTo(game, spriteGroup, selectedSprite, tilex, tiley) {
        var sizeOfTile = 32;
        var pathOfUnit = null;
        var tween = null;
        var speed = 150;
        var additionnalPoints = this.checkerHelper.getPositionOfAllUnits(spriteGroup);

        console.log(additionnalPoints);

        for (var i = 0; i < additionnalPoints.length; i++) {
            this.pathfinder._easyStar.avoidAdditionalPoint(additionnalPoints[i].x,additionnalPoints[i].y);
        }
        
        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            path.shift();
            tween = game.add.tween(selectedSprite);
            for(var i = 0, ilen = path.length; i < ilen; i++) {
                tween.to({x: path[i].x*sizeOfTile, y: path[i].y*sizeOfTile}, speed, Phaser.Easing.Linear.None); // in this case we don't predefine the tween (but works the same way)
            }
            var blocked;
            blocked = false;
            pathOfUnit = path;
        });

        console.log(spriteGroup);
        console.log(selectedSprite);
        console.log(selectedSprite.mapPosition);
        console.log([tilex,tiley]);
        console.log([selectedSprite.mapPosition.x,selectedSprite.mapPosition.y]);        

        this.pathfinder.preparePathCalculation([selectedSprite.mapPosition.x,selectedSprite.mapPosition.y], [tilex,tiley]);
        this.pathfinder.calculatePath();

        if(pathOfUnit.length !== 0){
            tween.start();
            this.positionSeter.setPosition(selectedSprite,tilex,tiley);
        }
        else{
            console.log('chemin vide, impossible d\'y aller');
        }

        this.pathfinder._easyStar.stopAvoidingAllAdditionalPoints();
    }
}

export default PathHelper;