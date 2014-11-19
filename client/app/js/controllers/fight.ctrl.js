'use strict';

angular.module('znieh')
	.controller('FightCtrl', function () {

	this.fightPhaser = System.get('main')['default'].start();
});
