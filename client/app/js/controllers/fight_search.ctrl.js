'use strict';

angular.module('znieh')
    .controller('FightSearchCtrl', function ($scope, SocketService, toastr, $location, AuthenticationService) {

    $scope.pool = 1;
    $scope.user = AuthenticationService.currentUser();
    $scope.teams = [
        {
            id: 1,
        },
        {
            id: 2,
        },
        {
            id: 3,
        }
    ];

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
