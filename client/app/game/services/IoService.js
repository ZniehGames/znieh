'use strict';

import MapService from './MapService';

class IoService {

  init(io) {
    this.io = io;
    this.io.on('unit moved', function(data) {
      MapService.moved(data);
    });
  }

}

export default new IoService();
