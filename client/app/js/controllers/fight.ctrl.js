'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window, AuthenticationService) {

  var game;

  SocketService.on('load user team', function(team) {
      game = System.get('main')['default'].start();
      game.io = SocketService;
      game.side = $window.sessionStorage.side;
      game.user = AuthenticationService.currentUser().username;
      game.state.states.placement.team = team;
      $scope.team = team;
      console.log('load user team', team);
  });

});
