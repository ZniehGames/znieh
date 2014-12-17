'use strict';

class Game {

    constructor() {
        this.team = null;
        this.side = null;
        this.tilemap = null;
        this.units = []; // Array<Unit>
    }

    create() {
        // We start the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add Map
        this.tilemap = this.game.add.tilemap('map');
        this.tilemap.addTilesetImage('tiles', 'map_tiles');
        this.map = new Map(this.tilemap);
        this.tilemap.setCollision(this.map.getBlockedTiles(), true);

        // Then, we create layers to add display
        this.layer = this.map.createLayer('Map');
        this.layer.resizeWorld();

        this.layer.debug = true;
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        console.log('Hello Placement!');
    }

}

export default Game;
