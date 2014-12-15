'use strict';

angular.module('znieh')
	.directive('objectinfo', function() {
    var directive = {};

    directive.restrict = 'E';

    directive.template = '<div class="col-md-4 object-info-container">' +
                          '<div class="object-info">' +
                            '<div class="name">{{ object.name }}</div>' +
                            '<div class="bonuses"><objectbonuses bonuses="object.bonuses"> </div>' +
                           '</div>' +
                         '</div>';

    directive.require = 'ngModel';

    directive.scope = {
        object : '=object',
        active : '@'
    };

    directive.link = function(scope, element, attrs, ngModel) {

      attrs.$observe('active', function(value) {
          if (value === 'true') {
            element.addClass('active');
            return;
          }
          element.removeClass('active');
      });

      element.on('click', function() {
        ngModel.$setViewValue(scope.object.id);
        scope.$apply();
      });
    };

    return directive;
});
