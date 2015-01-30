'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window, AuthenticationService) {

  var game;

  $scope.side = '';
  $scope.units = null;

  // We start the game and add our team display
  SocketService.on('game start', function(data) {
      game = System.get('main')['default'].start(
        SocketService,
        data.side,
        AuthenticationService.currentUser().username,
        data.units,
        $scope
      );

      $scope.side = data.side;
  });

});
