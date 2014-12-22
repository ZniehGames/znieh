'use strict';

import UnitsManager from '../services/UnitsManager';
import Map from '../model/Map';

class Game {

    constructor() {
        this.team = null;
        this.side = null;
        this.tilemap = null;
        this.unitsManager = new UnitsManager();
    }

    create() {
        console.log('Game.js');

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add Map
        this.tilemap = this.game.add.tilemap('map');
        this.tilemap.addTilesetImage('tiles', 'map_tiles');
        this.map = new Map(this.tilemap);
        this.tilemap.setCollision(this.map.getBlockedTiles(), true);

        this.unitsManager.create(this.units, this.game);

        // Then, we create layers to add display
        this.layer = this.tilemap.createLayer('Map');
        this.layer.resizeWorld();

        this.layer.debug = true;
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        console.log('Hello Game!');
    }

}

export default Game;
