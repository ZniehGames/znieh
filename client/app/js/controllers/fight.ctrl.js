'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window, AuthenticationService) {

  var game;

  SocketService.on('load user team', function(team) {
      game = System.get('main')['default'].start(
        SocketService,
        $window.sessionStorage.side,
        AuthenticationService.currentUser().username,
        team
      );
      $scope.team = team;
      console.log('load user team', team);
  });

});
