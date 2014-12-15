'use strict';

class Preload {

    preload() {
      this.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
      this.load.spritesheet('sprite_default', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
      this.load.json('team', 'http://api.znieh.dev/app_test.php/users/47/team');
    }

    create() {
    	// when all the stuff is loaded we start the Game state
    	this.game.state.start('game');
    }

}

export default Preload;