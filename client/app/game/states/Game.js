'use strict';

import Unit from '../model/Unit';
import Map from '../model/Map';
import MapView from '../view/MapView';

class Game {

    constructor() {
        this.marker;
        this.selectedTile;
        this.map;
        this.tilemap;
        this.mapView;
    }

    preload() {
      this.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
      this.load.spritesheet('nigga', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
    }

    create() {

        // We start the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#ffffff';

        // We add the tilemap with tiles images
        this.tilemap = this.game.add.tilemap('map');
        this.tilemap.addTilesetImage('tiles', 'map_tiles');

        // Then, we create layers to add display
        this.layer = this.tilemap.createLayer('Map');
        this.layer.resizeWorld();

        // We create a marker to show the tile being hovered
        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);

        // We create our model Map object
        this.map = new Map(this.tilemap);

        // We add collision
        this.tilemap.setCollision(this.map.getBlockedTiles(), true);

        // Finally we place units to random positions
        var units = [];
        units.push(new Unit());
        units.push(new Unit());
        this.map.randomUnitsPlacement(units);

        this.mapView = new MapView(this.game);
        this.mapView.render(this.map);

        this.layer.debug = true;
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        console.log('Hello Game!');
    }

}

export default Game;
