'use strict';

class Preload {

    constructor() {
    }

    preload() {
        this.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
        this.load.spritesheet('sprite_default', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
    }

    create() {
        var that = this;

        this.game.io.on('load user team', function (team) {
            var side = 'left';

            // We need to start the placement state
            that.game.state.states.placement.team = team;
            that.game.state.states.placement.side = side;
            that.game.state.start('placement');
        });

        this.game.stage.backgroundColor = '#ffffff';
    }
}

export default Preload;
