'use strict';

angular.module('znieh')
    .factory('SocketService', function (socketFactory) {

    var SocketService = socketFactory({
        ioSocket: io.connect(config.gameserver)
    });

    return SocketService;
});
