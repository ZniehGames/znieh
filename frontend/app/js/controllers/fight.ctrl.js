'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window, AuthenticationService) {

  var game;

  $scope.side = '';
  $scope.units = null;

  SocketService.forward('game start', $scope);

  // We start the game and add our team display
  $scope.$on('socket:game start', function(ev, data) {

    console.log('game start', data);

      // kill previous game if any, this ctrl is not useful anymore
      if (game) {
        console.log('destroy game');
        game.destroy();
      }

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
