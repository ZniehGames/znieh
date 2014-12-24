'use strict';

angular.module('znieh')
    .controller('CaserneCtrl', function ($scope, Restangular, AuthenticationService, UnitsService, toastr, $location) {

    // Default values
    $scope.currentSlot = 'helm';
    $scope.weaponChoice = 'sword';
    $scope.unit = {
      'size': 2,
      'physical': 2
    };

    // Hard coded types to avoid GET requests...
    $scope.weapons = {
      'axe' : { 'types' : ['Hampe', 'Tête de hache', 'Poignée'] },
      'sword' : { 'types' : ['Pommeau', 'Lame', 'Manche', 'Garde'] },
      'hammer' : { 'types' : ['Hampe', 'Tête de marteau', 'Poignée'] }
    };
    $scope.sizes = [ {'id': 1, 'name': 'Petit'}, {'id': 2, 'name': 'Normal'}, {'id': 3, 'name': 'Grand'} ];
    $scope.physicals = [ {'id': 1, 'name': 'Fin'}, {'id': 2, 'name': 'Normal'}, {'id': 3, 'name': 'Musclé'} ];

    // We fetch unlocked gameobjects and add them to the scope
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
      return 'Pommeau'          === $scope.currentSlot ||
             'Tête de hache'    === $scope.currentSlot ||
             'Tête de marteau'  === $scope.currentSlot ||
             'Lame'             === $scope.currentSlot ||
             'Manche'           === $scope.currentSlot ||
             'Garde'            === $scope.currentSlot ||
             'Poignée'          === $scope.currentSlot ||
             'Hampe'            === $scope.currentSlot
        ;
    };

    // Refresh unit preview
    $scope.change = function() {
      Restangular.all('units').all('previews').post(UnitsService.format($scope.unit)).then(function(preview) {
        $scope.preview = JSON.parse(preview, true);
      });
    };

    $scope.submit = function() {
      Restangular.all('units').post(UnitsService.format($scope.unit)).then(function() {
        toastr.success('Félicitations', 'Vous disposez d\'une nouvelle unité');
        $location.path('/search');
      });
    };

});
