'use strict';

angular.module('znieh')
    .controller('CaserneCtrl', function ($scope, Restangular, AuthenticationService) {

    $scope.currentSlot = 'helm';
    $scope.weaponChoice = 'sword';

    $scope.unit = {};
    $scope.weapons = {
      'axe' : { 'types' : ['Pommeau', 'Tête de hache'] },
      'sword' : { 'types' : ['Pommeau', 'Lame', 'Manche', 'Garde'] },
      'hammer' : { 'types' : ['Pommeau', 'Tête de marteau'] }
    };

    Restangular
    .one('users', AuthenticationService.currentUser().id)
    .getList('armorparttypes')
    .then(function(armorparttypes) {
        $scope.armorparttypes = armorparttypes;
    });

    Restangular
    .one('users', AuthenticationService.currentUser().id)
    .getList('runetypes')
    .then(function(runetypes) {
        $scope.runetypes = runetypes;
    });

    Restangular
    .one('users', AuthenticationService.currentUser().id)
    .getList('weaponparttypes')
    .then(function(weaponparttypes) {
        $scope.weaponparttypes = weaponparttypes;
    });

    $scope.isArmorSlot = function() {
      return 'helm' === $scope.currentSlot ||
             'greaves' === $scope.currentSlot ||
             'torso' === $scope.currentSlot ||
             'boots' === $scope.currentSlot ||
             'gloves' === $scope.currentSlot
        ;
    };

});
