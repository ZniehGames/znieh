'use strict';

angular.module('znieh')
    .factory('UnitsService', function () {

  return {
        /* format to send POST request to API */
        format : function(unit) {

          var weapons = [];
          if (unit.weapon) {
            for (var i in unit.weapon.parts) {
              weapons.push(unit.weapon.parts[i]);
            }
          }

          var format = {
            'name': unit.name || 'default name',
            'size': unit.size,
            'physical': unit.physical,
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

        if (unit.armor) {
          if (unit.armor.helm && unit.armor.helm.part) {
           format.armor.helm.part = unit.armor.helm.part;
          }
          if (unit.armor.helm && unit.armor.helm.rune) {
           format.armor.helm.rune = unit.armor.helm.rune;
          }
          if (unit.armor.torso && unit.armor.torso.part) {
           format.armor.torso.part = unit.armor.torso.part;
          }
          if (unit.armor.torso && unit.armor.torso.rune) {
           format.armor.torso.rune = unit.armor.torso.rune;
          }
          if (unit.armor.gloves && unit.armor.gloves.part) {
           format.armor.gloves.part = unit.armor.gloves.part;
          }
          if (unit.armor.gloves && unit.armor.gloves.rune) {
           format.armor.gloves.rune = unit.armor.gloves.rune;
          }
          if (unit.armor.greaves && unit.armor.greaves.part) {
           format.armor.greaves.part = unit.armor.greaves.part;
          }
          if (unit.armor.greaves && unit.armor.greaves.rune) {
           format.armor.greaves.rune = unit.armor.greaves.rune;
          }
          if (unit.armor.boots && unit.armor.boots.part) {
           format.armor.boots.part = unit.armor.boots.part;
          }
          if (unit.armor.boots && unit.armor.boots.rune) {
           format.armor.boots.rune = unit.armor.boots.rune;
          }
        }

         return format;
        }
  };
});
