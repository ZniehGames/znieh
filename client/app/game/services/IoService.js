'use strict';

import MapService from './MapService';
import FightService from './FightService';

class IoService {

  init(io) {
    this.io = io;

    this.io.on('unit moved', function(data) {
      MapService.moved(data);
    });

    this.io.on('unit attacked', function(data) {
      FightService.attacked(data);
    });
  }

}

export default new IoService();
