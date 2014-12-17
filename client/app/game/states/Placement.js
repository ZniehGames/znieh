'use strict';

import UnitManager from '../services/UnitManager';
import Map from '../model/Map';

class Placement {

    constructor() {
        this.team = null;
        this.side = null;
        this.tilemap = null;
        this.units = []; // Array<Unit>
        this.unitManager = new UnitManager();
    }

    create() {
        var that = this;

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add Map
        this.tilemap = this.game.add.tilemap('map');
        this.tilemap.addTilesetImage('tiles', 'map_tiles');
        this.map = new Map(this.tilemap);
        this.tilemap.setCollision(this.map.getBlockedTiles(), true);

        // Add units
        this.units = this.unitManager.createFromTeam(this.team, this.game);

        // Then, we create layers to add display
        this.layer = this.tilemap.createLayer('Map');
        this.layer.resizeWorld();

        this.layer.debug = true;
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        console.log('Hello Placement!');

        this.game.io.on('match ready', function () {
            that.game.state.states.game.units = that.units;
            that.game.state.states.game.side = that.side;
            that.game.state.start('game');
        });

        // User can't make custom placement yet... :(
        this.game.io.emit('placement done', this.units);
    }

    update() {

    }
}

export default Placement;
