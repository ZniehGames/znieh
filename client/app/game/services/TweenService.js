'use strict';

class TweenService {

    constructor() {
      this.game = null;
    }

    init(game) {
      this.game = game;
    }

    move(unit, path, cb) {
      var tween = this.game.add.tween(unit);
      for (var i = 0; i < path.length; i++) {
          tween.to({
            x: path[i].x * 32,
            y: path[i].y * 32
          }, 150, Phaser.Easing.Linear.None);
      }
      tween._lastChild.onComplete.add(cb);
      tween.start();
    }

}

export default new TweenService();
