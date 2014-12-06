'use strict';

angular.module('znieh')
    .controller('FightSearchCtrl', function ($scope, SocketService) {

    $scope.pool = 1;

    $scope.searchFight = function () {
        SocketService.emit('test');

    .controller('FightSearchCtrl', function ($scope, SocketService, toastr) {

    $scope.pool = 1;

    SocketService.on('searching match', function() {
        toastr.info('Recherche en cours', 'Informations');
    });

    SocketService.on('match found', function() {
        toastr.success('Match trouvé', 'Cool');
    });

    $scope.searchFight = function () {
        SocketService.emit('search match');
    };
});
