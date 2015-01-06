'use strict';

class Preload {

    constructor() {
        this.cacheKey = Phaser.Plugin.Tiled.utils.cacheKey;
    }

    preload() {
        this.game.add.plugin(Phaser.Plugin.Tiled);

        this.game.load.tiledmap(this.cacheKey('map', 'tiledmap'), '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image(this.cacheKey('map', 'tileset', 'tiles'), '../../images/fight/sprites/maps/tiles.jpg');

        this.load.spritesheet('sprite_default', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
    }

    create() {
        var that = this;

        this.game.io.on('load user team', function (team) {
            // We need to start the placement state
            that.game.state.states.placement.team = team;
            that.game.state.start('placement');
        });

        this.game.stage.backgroundColor = '#ffffff';
    }
}

export default Preload;
