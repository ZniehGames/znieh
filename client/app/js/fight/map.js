'use strict';

var game = new Phaser.Game(800, 480, Phaser.AUTO, 'game-app', { preload: preload, create: create, update: update, render : render});

var map;
var layer;
var player;

function preload() {
  game.load.tilemap('map', '../../json/map.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('map_tiles', '../../images/fight/sprites/maps/tiles.jpg');
  game.load.spritesheet('nigga', '../../images/fight/sprites/units/perso_casqueArgent.png', 40, 50);
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
  
  player = game.add.sprite(50, game.world.height - 80, 'nigga');
  
  game.physics.enable(player);

  player.enableBody = true;

  player.body.debug = true;
  layer.debug = true;

  player.body.setSize(24,24);
  player.anchor.setTo(0.5,1.1);

  player.animations.add('bottom', [0], 10, true);
  player.animations.add('right', [1], 10, true);
  player.animations.add('top', [2], 10, true);
  player.animations.add('left', [3], 10, true);
  
  player.body.collideWorldBounds = true;

  game.physics.setBoundsToWorld(true, true, true, true, false);

  player.animations.play('right');
}

function update() {

  var velocity = 150;

  game.physics.arcade.collide(player,layer);
  
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    player.body.velocity.x -= velocity;
    player.animations.play('left');
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    player.body.velocity.x += velocity;
    player.animations.play('right');  
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
  {
    player.body.velocity.y -= velocity;
    player.animations.play('top');
  }
  else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
  {
    player.body.velocity.y += velocity;
    player.animations.play('bottom');
  }
}

function render() {
  game.debug.body(player);
}

function getBlockedTiles(map) {
  var result = Object.keys(map.tilesets[0].tileproperties);
  var ArrayInt = [];
  
  function toInt(element, index, array) {
    ArrayInt.push(parseInt(element));
  }

  result.forEach(toInt);
  return ArrayInt;
}