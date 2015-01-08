'use strict';

import UnitsManager from '../services/UnitsManager';
import Map from '../model/Map';

class Placement {

    constructor() {
        this.team = null;
        this.side = null;
        this.tilemap = null;
        this.units = []; // Array<Unit>
        this.unitsManager = new UnitsManager();
        this.ready = true;
        this.unitsGroup = null;
        this.selectedSprite = null;
    }

    create() {
        var that = this;

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add Map
        this.tilemap = this.game.add.tilemap('map');
        this.tilemap.addTilesetImage('tiles', 'map_tiles');
        this.map = new Map(this.tilemap);
        this.tileBlocked = this.map.getBlockedTiles();
        this.tilemap.setCollision(this.tileBlocked, true);
        
        // this a group for matching collisions and others
        this.spriteGroup = this.game.add.group();

        // Then, we create layers to add display
        this.layer = this.tilemap.createLayer('Map');
        this.layer.resizeWorld();
        this.layer.debug = true;
        
        // Add units
        this.units = this.unitsManager.createFromTeam(this.team, this.game, this.spriteGroup, this.layer, this.tilemap, this.selectedSprite, this.tileBlocked);

        this.game.physics.setBoundsToWorld(true, true, true, true, false);

        this.game.io.on('match ready', function (data) {
            console.log('Match ready!', data);
            that.game.state.states.game.units = data;
            that.game.state.states.game.side = that.side;
            that.game.state.start('game');
        });

        this.game.io.on('placement failed', function () {
            console.log('placement failed');
            that.unitsManager.changePositionsUnits(that.units, that.game);
            that.ready = false;
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
                    'x': this.units[i].mapPosition.x,
                    'y': this.units[i].mapPosition.y
                });
                console.log(this.units[i].x, this.units[i].y);
            }

            this.game.io.emit('placement done', positions);
        }

    }
}

export default Placement;
