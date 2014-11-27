'use strict';

module.exports = function loginCtrl(io) {

  io.on('connection', function(socket){
    console.log('connection');
  });

}
