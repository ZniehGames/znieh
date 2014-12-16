'use strict';

import MapUtils from '../utils/MapUtils';
import Unit from '../model/Unit';

class Placement {

    constructor() {
        this.team = null;
        this.side = null;
        this.units = [];
    }

    preload() {
        this.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
        this.load.spritesheet('sprite_default', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
    }

    create() {
        var mapUtils = new MapUtils();

        var that = this;
        this.game.io.on('load user team', function (team) {
            that.team = team;
            that.side = 'left';
            console.log('team placement.js');

            for (var i = 0; i < team.units.length; i++) {
                that.units.push(new Unit(that.game, 32, i * 32, team.units[i]));
            }
        });

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#ffffff';
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'map_tiles');
        this.layer = this.map.createLayer('Map');
        this.layer.resizeWorld();

        this.result = mapUtils.getBlockedTiles(this.game.cache.getTilemapData('map').data);
        this.map.setCollision(this.result, true);

        this.layer.debug = true;
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        console.log('Hello Game!');
    }
}

export default Placement;
