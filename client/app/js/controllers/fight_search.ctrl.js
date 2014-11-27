'use strict';

angular.module('znieh')
<<<<<<< HEAD
    .controller('FightSearchCtrl', function ($scope, SocketService) {

    $scope.pool = 1;

    $scope.searchFight = function () {
        SocketService.emit('test');
=======
    .controller('FightSearchCtrl', function ($scope, SocketService, toastr, AuthenticationService) {

    $scope.pool = 1;
    SocketService.emit('authenticate', AuthenticationService.currentUser);

    SocketService.on('searching match', function() {
        toastr.info('Recherche en cours', 'Informations');
    });

    SocketService.on('match found', function() {
        toastr.success('Match trouvé', 'Cool');
    });

    $scope.searchFight = function () {
        SocketService.emit('search match');
>>>>>>> add server, client fixes, and tests
    };
});
