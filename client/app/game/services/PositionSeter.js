'use strict';

class PositionSeter {
    setPosition(sprite, x, y){
      sprite.x = x*32;
      sprite.y = y*32;
    }

    setMapPosition(sprite, x, y){
      sprite.mapPosition = {'x' : x, 'y' : y};
    }

}

export default PositionSeter;