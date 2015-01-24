'use strict';

class Preload {

    constructor() {
        this.cacheKey = Phaser.Plugin.Tiled.utils.cacheKey;
    }

    preload() {
        this.game.add.plugin(Phaser.Plugin.Tiled);

        this.game.load.tiledmap(this.cacheKey('map', 'tiledmap'), '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image(this.cacheKey('map', 'tileset', 'tiles'), '../../images/fight/sprites/maps/tiles.jpg');
        this.load.atlasJSONArray('units', '../../images/fight/sprites/units/units.png', '../../json/units.json');
    }

    create() {
        this.game.state.start('placement');
    }
}

export default Preload;
