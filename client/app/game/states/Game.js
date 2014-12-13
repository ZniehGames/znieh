'use strict';

import MapUtils from '../utils/MapUtils';
import SpriteUtils from '../utils/SpriteUtils';
import DebugUtils from '../utils/DebugUtils';
import PlacementUtils from '../utils/PlacementUtils';
import PathUtils from '../utils/PathUtils';
import PositionUtils from '../utils/PositionUtils';

class Game {

    constructor() {

        // utils for Game
        this.mapUtils = new MapUtils(this);
        this.spriteUtils = new SpriteUtils(this);
        this.placementUtils = new PlacementUtils(this);
        this.pathUtils = new PathUtils(this);
        this.positionUtils = new PositionUtils(this);
        this.debugUtils = null;
        // reference to game
        this.game = null;
        // reference for selected sprite
        this.selectedSprite = null;
        // lists of sprites
        this.spriteLists = [];
        // group for testing overlap of units
        this.spriteGroup = null;
        // teams of units
        this.teamUnits = null;
    }
    
    create() {

        this.debugUtils = new DebugUtils({'debug' : this.options.debug});

        // instanciation bases of the game
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#ffffff';
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tiles', 'map_tiles');
        this.layer = this.map.createLayer('Map');
        this.layer.resizeWorld();

        // creation of collision layer
        this.tileBlocked = this.mapUtils.getBlockedTiles();
        this.map.setCollision(this.tileBlocked, true);

        this.placementUtils.init(this.options);

        // we init the collisions with bounds of the world
        this.game.physics.setBoundsToWorld(true, true, true, true, false);
        
        // we create a group for overlap checking between units
        this.spriteGroup = this.game.add.group();

        // we add a listener to map, and used for placement
        this.mapUtils.addEventListenerToMapPlacement();

        //first try with pathfinding
        this.pathUtils.init();

        if(this.debugUtils.isDebug()) {
            this.layer.debug = true;
        }
    }

    render() {
        if (this.selectedSprite !== null) { 
            if(this.debugUtils.isDebug()) {
                this.game.debug.body(this.selectedSprite);
            }    
        }
    }
}

export default Game;
