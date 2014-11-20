'use strict';

import MapUtils from '../utils/MapUtils';
import SpriteUtils from '../utils/SpriteUtils';

class Game {

    constructor() {
        this.selectedSprite = null;
        this.game = null;
        this.spriteLists = [];
        this.mapUtils = new MapUtils(this);
        this.spriteUtils = new SpriteUtils(this);
        this.spriteGroup = null;
    }

    preload() {
      this.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
      this.load.spritesheet('nigga', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#ffffff';
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'map_tiles');
        this.layer = this.map.createLayer('Map');
        this.layer.resizeWorld();

        this.result = this.mapUtils.getBlockedTiles();
        this.map.setCollision(this.result, true);

        this.layer.debug = true;
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        
        //this.spriteLists.push(this.spriteUtils.addSprite({'placement' : { 'x' : 0, 'y' : 0}}));
        //this.spriteLists.push(this.spriteUtils.addSprite({'placement' : { 'x' : 1, 'y' : 0}}));
        //this.spriteLists.push(this.spriteUtils.addSprite({'placement' : { 'x' : 2, 'y' : 0}}));

        this.spriteGroup = this.game.add.group();
        
        this.mapUtils.addEventListenerToMap();

        console.log('Hello Game!');
    }

    render() {
        if (this.selectedSprite !== null) { 
            this.game.debug.body(this.selectedSprite);
        }
    }


}

export default Game;
