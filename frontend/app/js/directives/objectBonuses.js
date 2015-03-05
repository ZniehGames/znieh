'use strict';

angular.module('znieh')
  .directive('objectBonuses', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/directives/object-bonuses.html',
      scope: {
        bonuses : '=bonuses'
      }
    };
});
