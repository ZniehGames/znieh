'use strict';

import UnitsManager from '../services/UnitsManager';
import MapService from '../services/MapService';
import Map from '../model/Map';

class Game {

    constructor() {
        this.team = null;
        this.side = null;
        this.tilemap = null;
        this.unitsManager = new UnitsManager();
    }

    create() {
        // We start the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add Map
        this.tilemap = this.game.add.tiledmap('map');
        this.map = new Map(this.tilemap);
        // game.physics.p2.convertTiledCollisionObjects(map, 'objectlayer-name');

        MapService.init(this.map);
        this.unitsManager.create(this.units, this.game);

        this.game.physics.setBoundsToWorld(true, true, true, true, false);

       // this.game.input.onDown.add(this.inputService.onDown, this);

        console.log('Hello Game!');
    }

}

export default Game;
