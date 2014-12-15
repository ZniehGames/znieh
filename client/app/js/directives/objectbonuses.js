'use strict';

angular.module('znieh')
  .directive('objectbonuses', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.template = '<span ng-repeat="bonus in bonuses"> {{ bonus.modifier }} <img src="../images/icons/agilite.png"> </span>';
    directive.scope = {
        bonuses : '=bonuses'
    };

    return directive;
});
