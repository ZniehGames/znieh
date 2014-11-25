import Tile from '../model/Tile';
import Map from '../model/Map';

class MapView {

  constructor(game) {
    this.game = game;
  }

  render(map) {
    var sprite;
    sprite = this.game.add.sprite(25, 25, 'nigga');
    sprite.enableBody = true;
    this.game.physics.enable(sprite);
    sprite.body.debug = true;
  }

}

export default MapView;
