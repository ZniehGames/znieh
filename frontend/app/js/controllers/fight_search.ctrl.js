'use strict';

angular.module('znieh')
    .controller('FightSearchCtrl', function ($scope, SocketService, toastr, $location, AuthenticationService, Restangular,  $window) {

    $scope.pool = 1;
    $scope.user = AuthenticationService.currentUser();
    $scope.teams = null;
    $scope.units = null;
    $scope.selectedTeam = null;

    Restangular
        .one('users', AuthenticationService.currentUser().id)
        .getList('teams')
        .then(function(teams) {
            $scope.teams = teams;
            $scope.selectedTeam = teams[0];
        });

    Restangular
        .one('users', AuthenticationService.currentUser().id)
        .getList('units')
        .then(function(units) {
            $scope.units = units;
        });

    SocketService.on('searching match', function() {
        toastr.info('Recherche en cours', 'Informations');
    });

    SocketService.on('match found', function(side) {
        $window.sessionStorage.side = side;
        $location.path('/fight');
    });

    $scope.searchFight = function () {
        SocketService.emit('search match');
    };

    $scope.select = function (index) {
        $scope.selectedTeam = $scope.teams[index];
    };
});
