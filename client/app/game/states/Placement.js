'use strict';

import UnitsManager from '../services/UnitsManager';
import MapService from '../services/MapService';
import Map from '../model/Map';

class Placement {

    constructor() {
        this.side = null;
        this.tilemap = null;
        this.units = []; // Array<Unit>
        this.ready = false;
    }

    create() {
        var that = this;

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        // Create the map with collisions
        var tiledmap = this.game.add.tiledmap('map');
        this.game.physics.p2.convertTiledmap(tiledmap, 'Map');
        var map = new Map(tiledmap);

        MapService.init(map);

        // Add units
        this.units = UnitsManager.createFromTeam(this.game.team, this.game);

        this.game.io.on('match ready', function (data) {
            var units = [];
            for (var j = 0; j < data.length; j++) {
                if (data[j].user === that.game.user) {
                    for (var i = 0; i < that.units.length; i++) {
                        if (that.units[i].id === data[j].id) {
                            units[j] = that.units[i];
                            units[j].x = data[j].x;
                            units[j].y = data[j].y;
                            units[j].isOwned = true;
                        }
                    }
                } else {
                    units[j] = data[j];
                    units[j].isOwned = false;
                }
            }
            that.game.state.states.game.units = units;
            that.game.state.states.game.side = that.side;
            that.game.state.start('game');
        });
    }

    update() {

        // User can't make custom placement yet... :'(
        if (this.ready === false) {
            this.ready = true;
            var positions = [];

            for (var i = this.units.length - 1; i >= 0; i--) {
                positions.push({
                    'id': this.units[i].id,
                    'x': this.units[i].tile.indexes.x,
                    'y': this.units[i].tile.indexes.y
                });
            }

            this.game.io.emit('placement done', positions);
        }

    }
}

export default Placement;
