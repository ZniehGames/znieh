import Tile from '../model/Tile';
import Map from '../model/Map';

class MapView {

  constructor(game) {
    this.game = game;
  }

  render(map) {

    var game = this.game;

    map.tiles.forEach(function(tile) {
      if (tile.hasUnit()) {
        var sprite;
        sprite = game.add.sprite(tile.x, tile.y, 'nigga');
        sprite.enableBody = true;
        game.physics.enable(sprite);
        sprite.body.debug = true;
      }
    });
  }

}

export default MapView;
