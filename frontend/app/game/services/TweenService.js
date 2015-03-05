'use strict';

import TweenHelper from './TweenHelper';

class TweenService {

    constructor() {
      this.game = null;
    }

    init(game) {
      this.game = game;
    }

    move(unit, path, cb) {

      var orientation = TweenHelper.getOrientation(unit.tile.indexes, path[0]);
      unit.animations.play('walk_' + orientation);

      var onMoveComplete = function() {
        return function(i) {
          if (path[i + 1]) {
            var nextOrientation = TweenHelper.getOrientation(path[i], path[i+1]);
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

    attack(attacker, defender, damage, cb) {
      var orientation = TweenHelper.getOrientation(attacker.tile.indexes, defender.tile.indexes);
      var animation = attacker.animations.play('atk_' + orientation, 7, false);
      animation.onComplete.removeAll();
      animation.onComplete.add(cb);
      animation.onComplete.add(function() {
        this.showDamage(defender, damage);
      }, this);
    }

    showDamage(unit, damage) {
        var text = this.game.add.text(unit.x, unit.y, '-' + damage);
        var tween = this.game.add.tween(text);
        tween.to({ x: unit.x + 10, y: unit.y - 10 }, 1000, Phaser.Easing.Linear.None);
        tween.onComplete.add(function() {
          text.destroy();
        }, this);
        tween.start();
    }

}

export default new TweenService();
