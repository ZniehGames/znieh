'use strict';

angular.module('znieh')
	.controller('FightCtrl', function ($scope, SocketService) {

  this.fightPhaser = System.get('main')['default'].start();
  this.fightPhaser.io = SocketService;

  SocketService.on('load user team', function(team) {
    $scope.team = team;
    console.log('load user team', team);
  });

});
