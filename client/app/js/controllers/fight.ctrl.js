'use strict';

class FightPhaser{

	constructor() {
		this.map = null;
		this.layer = null;
		this.game = null;

		// Finally we create the game
		this.game = new Phaser.Game(800, 480, Phaser.AUTO, 'game-app', { preload: this.preload, create: this.create, update: this.update, render : this.render});	
	}

	preload() {
		this.game.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
	}

	create() {
	
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.stage.backgroundColor = '#ffffff';

		this.map = this.game.add.tilemap('map');

		//  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
		//  The second parameter maps this name to the Phaser.Cache key 'tiles'
		this.map.addTilesetImage('tiles', 'map_tiles');

		//  Creates a layer from the Map layer in the map data.
		this.layer = this.map.createLayer('Map');

		this.layer.resizeWorld();

		this.result = FightPhaser.getBlockedTiles(this.game.cache.getTilemapData('map').data);       

		this.map.setCollision(this.result, true);

		this.layer.debug = true;

		this.game.physics.setBoundsToWorld(true, true, true, true, false);
	}

	update() {

	}

	render() {

	}

	getBlockedTiles (map) {
		
		var result = Object.keys(map.tilesets[0].tileproperties);
		var ArrayInt = [];

		function toInt(element) {
		ArrayInt.push(parseInt(element));
		}

		result.forEach(toInt);
		return ArrayInt;
	}

}


angular.module('znieh')
	.controller('FightCtrl', function () {

	this.fightPhaser = System.get('main')['default'].start();

});
