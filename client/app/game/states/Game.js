'use strict';

import UnitsManager from '../services/UnitsManager';
import MapService from '../services/MapService';
import TweenService from '../services/TweenService';
import Map from '../model/Map';

class Game {

    constructor() {
        this.team = null;
        this.side = null;
    }

    create() {
        // We start the game
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        // Create the map with collisions
        var tiledmap = this.game.add.tiledmap('map');
        var map = new Map(tiledmap);
        this.game.physics.p2.convertTiledmap(tiledmap, 'Map');

        // Init game services
        MapService.init(map);
        TweenService.init(this.game);
        UnitsManager.create(this.units, this.game);
    }

}

export default Game;
