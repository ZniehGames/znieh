'use strict';

angular.module('znieh')
    .factory('SocketService', function (socketFactory) {

<<<<<<< HEAD
    var serverSocket = io.connect('localhost:1337');

=======
    var serverSocket = io.connect(config.gameserver);
    console.log(serverSocket);
>>>>>>> add server, client fixes, and tests
    mySocket = socketFactory({
        ioSocket: serverSocket
    });

    return mySocket;
});
