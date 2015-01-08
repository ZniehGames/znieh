'use strict';

import UnitsManager from '../services/UnitsManager';
//import Map from '../model/Map';

class Placement {

    constructor() {
        this.team = null;
        this.side = null;
        this.tilemap = null;
        this.units = []; // Array<Unit>
        this.unitsManager = new UnitsManager();
        this.ready = false;
    }

    create() {
        var that = this;

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        // Create the map with collisions
        var tiledmap = this.game.add.tiledmap('map');
        //var map = new Map(tiledmap);
        this.game.physics.p2.convertTiledmap(tiledmap, 'Map');

        // Add units
        this.units = this.unitsManager.createFromTeam(this.team, this.game);

        this.game.io.on('match ready', function (data) {
            console.log('Match ready!', data);
            that.game.state.states.game.units = data;
            that.game.state.states.game.side = that.side;
            that.game.state.start('game');
        });

        console.log('Hello Placement!');
    }

    update() {

        // User can't make custom placement yet... :'(
        if (this.ready === false) {
            this.ready = true;
            var positions = [];

            for (var i = this.units.length - 1; i >= 0; i--) {
                positions.push({
                    'id': this.units[i].id,
                    'x': this.units[i].x,
                    'y': this.units[i].y
                });
            }

            this.game.io.emit('placement done', positions);
        }

    }
}

export default Placement;
