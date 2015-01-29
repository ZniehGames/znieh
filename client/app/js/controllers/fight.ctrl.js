'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window, AuthenticationService) {

  var game;

  $scope.side = $window.sessionStorage.side;
  $scope.leftTeam = null;
  $scope.rightTeam = null;

  // We start the game and add our team display
  SocketService.on('game start', function(data) {
      game = System.get('main')['default'].start(
        SocketService,
        data.side,
        AuthenticationService.currentUser().username,
        data.units
      );

      if ($scope.side === 'left') {
        $scope.leftTeam = data.units;
        return;
      }
      $scope.rightTeam = data.units;
  });

  // We add opponent team
  SocketService.on('match ready', function(data) {
      console.log('match ready', data);

      var team = [];
      for (var i = 0; i < data.length; i++) {
          if (data[i].user !== AuthenticationService.currentUser().username) {
            team.push(data[i]);
          }
      }

      if ($scope.side === 'left') {
        $scope.rightTeam = team;
        return;
      }
      $scope.leftTeam = team;
  });

});
