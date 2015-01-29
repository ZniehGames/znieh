'use strict';

import UnitsManager from '../services/UnitsManager';
import MapService from '../services/MapService';
import Map from '../model/Map';

class Placement {

    constructor() {
        this.side = null;
        this.units = []; // Array<Unit>
        this.ready = false;
    }

    create() {

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        this.game.stage.disableVisibilityChange = true;

        // Create the map with collisions
        var tiledmap = this.game.add.tiledmap('map');
        this.game.physics.p2.convertTiledmap(tiledmap, 'Map');
        var map = new Map(tiledmap);

        MapService.init(map);

        // Add units
        this.units = UnitsManager.create(this.game.team, this.game);
        for (var i = this.units.length - 1; i >= 0; i--) {
            this.units[i].isOwned = true;
        }
        this.game.$scope.units = this.units;
        this.game.$scope.$digest();

        this.game.io.on('match ready', (data) => {
            var units = [];
            for (var j = 0; j < data.length; j++) {
                if (data[j].user === this.game.user) {
                    for (var i = 0; i < this.units.length; i++) {
                        if (this.units[i].id === data[j].id) {
                            units[j] = this.units[i];
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
            this.game.state.states.game.units = units;
            this.game.state.states.game.side = this.side;
            this.game.state.start('game');
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
