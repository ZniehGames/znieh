'use strict';

import MapUtils from '../utils/MapUtils';

class Game {

    preload() {
      this.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
    }

    create() {

        var mapUtils = new MapUtils();

        this.game.io.emit('test');

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

export default Game;
