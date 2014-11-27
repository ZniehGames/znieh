'use strict';

angular.module('znieh')
    .factory('SocketService', function (socketFactory) {

    var serverSocket = io.connect('http://znieh.dev:1337');
    console.log(serverSocket);
    mySocket = socketFactory({
        ioSocket: serverSocket
    });

    return mySocket;
});
