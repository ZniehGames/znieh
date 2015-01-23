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

      var getOrientation = function(start, end) {
        start = start || unit.tile.indexes;
        if (start.y > end.y) {
          return 'up';
        }
        if (start.y < end.y) {
         return 'down';
        }
        if (start.x > end.x) {
         return 'left';
        }
        if (start.x < end.x) {
         return 'right';
        }
      };

      unit.animations.play('walk_' + getOrientation(unit.tile.indexes, path[0]));

      var onMoveComplete = function() {
        return function(i) {
          if (path[i + 1]) {
            unit.animations.play('walk_' + getOrientation(path[i], path[i+1]));
            return;
          }
          unit.animations.play('idle_' + getOrientation(path[i - 1], path[i]));
        };
      };

      for (var i = 0; i < path.length; i++) {
          tween.to({
            x: path[i].x * 32,
            y: path[i].y * 32
          }, 300, Phaser.Easing.Linear.None);
          tween.onComplete.add(onMoveComplete(i).bind(this, i));
      }
      tween._lastChild.onComplete.add(cb);
      tween.start();
    }

}

export default new TweenService();
