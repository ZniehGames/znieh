'use strict';

angular.module('znieh')
    .controller('CaserneCtrl', function ($scope, Restangular, AuthenticationService, UnitsService) {

    $scope.currentSlot = 'helm';
    $scope.weaponChoice = 'sword';

    $scope.unit = {
      'size': 2,
      'physical': 2
    };

    $scope.weapons = {
      'axe' : { 'types' : ['Pommeau', 'Tête de hache'] },
      'sword' : { 'types' : ['Pommeau', 'Lame', 'Manche', 'Garde'] },
      'hammer' : { 'types' : ['Pommeau', 'Tête de marteau'] }
    };

    $scope.sizes = [ {'id': 1, 'name': 'Petit'}, {'id': 2, 'name': 'Normal'}, {'id': 3, 'name': 'Grand'} ];
    $scope.physicals = [ {'id': 1, 'name': 'Fin'}, {'id': 2, 'name': 'Normal'}, {'id': 3, 'name': 'Musclé'} ];

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

    $scope.setCurrentSlot = function(slot) {
      $scope.currentSlot = slot;
    };

    $scope.isArmorSlot = function() {
      return 'helm'    === $scope.currentSlot ||
             'greaves' === $scope.currentSlot ||
             'torso'   === $scope.currentSlot ||
             'boots'   === $scope.currentSlot ||
             'gloves'  === $scope.currentSlot
        ;
    };

    $scope.isWeaponSlot = function() {
      return 'Pommeau'        === $scope.currentSlot ||
             'Tête de hache'  === $scope.currentSlot ||
             'Lame'           === $scope.currentSlot ||
             'Manche'         === $scope.currentSlot ||
             'Garde'          === $scope.currentSlot
        ;
    };

    $scope.change = function() {
      Restangular.all('units').all('previews').post(UnitsService.format($scope.unit)).then(function(preview) {
        $scope.preview = JSON.parse(preview, true);
      });
    };

    $scope.submit = function() {
      Restangular.all('units').post(UnitsService.format($scope.unit));
    };

});
