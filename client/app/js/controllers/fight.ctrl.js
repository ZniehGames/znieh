'use strict';

angular.module('znieh')
	.controller('FightCtrl', function () {

	var map;
	var layer;

	function preload() {
	  game.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
	  game.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
	}

	function create() {
	  game.physics.startSystem(Phaser.Physics.ARCADE);

	  game.stage.backgroundColor = '#ffffff';

	  map = game.add.tilemap('map');

	  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
	  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
	  map.addTilesetImage('tiles', 'map_tiles');

	  //  Creates a layer from the Map layer in the map data.
	  layer = map.createLayer('Map');
	  
	  layer.resizeWorld();

	  var result = getBlockedTiles(game.cache.getTilemapData('map').data);       

	  map.setCollision(result, true);
	  
	  layer.debug = true;

	  game.physics.setBoundsToWorld(true, true, true, true, false);

	}

	function update() {

	}

	function render() {

	}

	function getBlockedTiles(map) {
	  var result = Object.keys(map.tilesets[0].tileproperties);
	  var ArrayInt = [];
	  
	  function toInt(element) {
	    ArrayInt.push(parseInt(element));
	  }

	  result.forEach(toInt);
	  return ArrayInt;
	}

	// Finally we create the game
	var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game-app', { preload: preload, create: create, update: update, render : render});
});