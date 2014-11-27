'use strict';

angular.module('znieh')
    .controller('FightSearchCtrl', function ($scope, SocketService) {

    $scope.pool = 1;

    $scope.searchFight = function () {
        SocketService.emit('connection');
    };
});
