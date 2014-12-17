'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService, $window) {

  SocketService.on('load user team', function(team) {
      $scope.team = team;
      console.log('load user team', team);
  });

	this.fightPhaser = System.get('main')['default'].start();
  this.fightPhaser.io = SocketService;
  this.fightPhaser.side = $window.sessionStorage.side;
});
