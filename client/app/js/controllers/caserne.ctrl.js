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

    $scope.sizes = [ 1,2,3 ];
    $scope.physicals = [ 1,2,3 ];

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
      return 'helm'    === $scope.currentSlot ||
             'greaves' === $scope.currentSlot ||
             'torso'   === $scope.currentSlot ||
             'boots'   === $scope.currentSlot ||
             'gloves'  === $scope.currentSlot
        ;
    };

    $scope.submit = function() {
      var weapons = [];

      if ($scope.unit.weapon) {
        for (var i in $scope.unit.weapon.parts) {
          weapons.push($scope.unit.weapon.parts[i].id);        
        }    
      }

      var unit = {
        'name': $scope.unit.name || 'default name',
        'size': $scope.unit.size,
        'physical': $scope.unit.physical,
        'weapon': { 
          'parts': weapons 
        },
        'armor': {
          'helm': {},
          'torso': {},
          'gloves': {},
          'greaves': {},
          'boots': {}
        }
      };

      if ($scope.unit.armor) {
        if ($scope.unit.armor.helm && $scope.unit.armor.helm.part) {
          unit.armor.helm.part = $scope.unit.armor.helm.part.id;
        }
        if ($scope.unit.armor.helm && $scope.unit.armor.helm.rune) {
          unit.armor.helm.rune = $scope.unit.armor.helm.rune.id;
        }
        if ($scope.unit.armor.torso && $scope.unit.armor.torso.part) {
          unit.armor.torso.part = $scope.unit.armor.torso.part.id;
        }
        if ($scope.unit.armor.torso && $scope.unit.armor.torso.rune) {
          unit.armor.torso.rune = $scope.unit.armor.torso.rune.id;
        }
        if ($scope.unit.armor.gloves && $scope.unit.armor.gloves.part) {
          unit.armor.gloves.part = $scope.unit.armor.gloves.part.id;
        }
        if ($scope.unit.armor.gloves && $scope.unit.armor.gloves.rune) {
          unit.armor.gloves.rune = $scope.unit.armor.gloves.rune.id;
        }
        if ($scope.unit.armor.greaves && $scope.unit.armor.greaves.part) {
          unit.armor.greaves.part = $scope.unit.armor.greaves.part.id;
        }
        if ($scope.unit.armor.greaves && $scope.unit.armor.greaves.rune) {
          unit.armor.greaves.rune = $scope.unit.armor.greaves.rune.id;
        }
        if ($scope.unit.armor.boots && $scope.unit.armor.boots.part) {
          unit.armor.boots.part = $scope.unit.armor.boots.part.id;
        }
        if ($scope.unit.armor.boots && $scope.unit.armor.boots.rune) {
          unit.armor.boots.rune = $scope.unit.armor.boots.rune.id;
        }
      }
      Restangular.all('units').post(unit);
    };

});
