'use strict';

class MapUtils {

    getBlockedTiles(map) {

        var result = Object.keys(map.tilesets[0].tileproperties);
        var arrayInt = [];

        function toInt(element) {
          arrayInt.push(parseInt(element));
        }

        result.forEach(toInt);
        return arrayInt;
    }
}

export default MapUtils;
