'use strict';

class TweenHelper {

  getOrientation(start, end) {
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
  }

}

export default new TweenHelper();
