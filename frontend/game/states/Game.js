'use strict';

import UnitsManager from '../services/UnitsManager';
import FightService from '../services/FightService';
import MapService from '../services/MapService';
import TweenService from '../services/TweenService';
import IoService from '../services/IoService';
import GameController from '../controllers/GameController';
import Map from '../model/Map';

class Game {

    constructor() {
        this.side = null;
    }

    create() {
        // We start the game
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.game.stage.disableVisibilityChange = true;

        // Create the map with collisions
        var tiledmap = this.game.add.tiledmap('map');
        var map = new Map(tiledmap);
        this.game.physics.p2.convertTiledmap(tiledmap, 'Map');

        // Init game services
        GameController.init(this.game.$scope);
        IoService.init(this.game.io);
        FightService.init(this.game.io, this.game.$scope);
        MapService.init(map, this.game.io);
        TweenService.init(this.game);
        var units = UnitsManager.create(this.units, this.game);
        this.game.$scope.units = units;
        this.game.$scope.$digest();
    }

}

export default Game;
