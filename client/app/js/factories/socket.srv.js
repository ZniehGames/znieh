'use strict';

angular.factory('SocketService', function (socketFactory) {
  var serverSocket = io.connect('localhost:1337');

  mySocket = socketFactory({
    ioSocket: serverSocket
  });

  return mySocket;
});
