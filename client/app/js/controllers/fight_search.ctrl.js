'use strict';

angular.module('znieh')
    .controller('FightSearchCtrl', function ($scope, SocketService, toastr, $location) {

    $scope.pool = 1;

    SocketService.on('searching match', function() {
        toastr.info('Recherche en cours', 'Informations');
    });

    SocketService.on('match found', function() {
        $location.path('/fight');
    });

    $scope.searchFight = function () {
        SocketService.emit('search match');
    };
});
