'use strict';

class TweenService {

    constructor() {
      this.game = null;
    }

    init(game) {
      this.game = game;
    }

    move(unit, path, cb) {

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

      var orientation = getOrientation(unit.tile.indexes, path[0]);
      unit.animations.play('walk_' + orientation);

      var onMoveComplete = function() {
        return function(i) {
          if (path[i + 1]) {
            var nextOrientation = getOrientation(path[i], path[i+1]);
            if (orientation !== nextOrientation) {
              unit.animations.stop('walk_' + orientation, true);
              orientation = nextOrientation;
              unit.animations.play('walk_' + orientation);
            }
          }
        };
      };

      var tweens = [];

      for (var i = 0; i < path.length; i++) {
          var tween = this.game.add.tween(unit);
            tween.to({
              x: path[i].x * 32,
              y: path[i].y * 32
            }, 300, Phaser.Easing.Quadratic.Out)
            .onComplete.add(onMoveComplete().bind(this, i));

           tweens[i] = tween;

           if (i > 0) {
             tweens[i - 1].chain(tweens[i]);
           }
      }

      tweens[path.length - 1].onComplete.add(function() {
        unit.animations.play('idle_' + orientation);
      });
      tweens[path.length - 1].onComplete.add(cb);
      tweens[0].start();
    }

}

export default new TweenService();
