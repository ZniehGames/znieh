'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window, AuthenticationService) {

  var game;

  $scope.side = $window.sessionStorage.side;
  $scope.leftTeam = null;
  $scope.rightTeam = null;

  // We start the game and add our team display
  SocketService.on('load user team', function(team) {
      game = System.get('main')['default'].start(
        SocketService,
        $window.sessionStorage.side,
        AuthenticationService.currentUser().username,
        team
      );
      if ($scope.side === 'left') {
        $scope.leftTeam = team;
        return;
      }
      $scope.rightTeam = team;
  });

  // We add opponent team
  SocketService.on('match ready', function(data) {
      console.log('match ready', data);

      var team = [];
      team.units = [];
      for (var i = 0; i < data.length; i++) {
          if (data[i].user !== AuthenticationService.currentUser().username) {
            team.units.push(data[i]);
          }
      }

      if ($scope.side === 'left') {
        $scope.rightTeam = team;
        return;
      }
      $scope.leftTeam = team;
  });

});
