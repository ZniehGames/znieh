'use strict';

angular.module('znieh')
    .controller('FightSearchCtrl', function ($scope, SocketService, AuthenticationService) {

    $scope.pool = 1;
    SocketService.emit('authenticate', AuthenticationService.currentUser);

    SocketService.on('match found', function() {
      alert('cc');
    });

    $scope.searchFight = function () {
        console.log("click");
        SocketService.emit('search match');
    };
});
