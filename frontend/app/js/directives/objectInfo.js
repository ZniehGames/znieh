'use strict';

angular.module('znieh')
	.directive('objectInfo', function() {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      templateUrl: 'partials/directives/object-info.html',
      scope: {
        object : '=object',
        active : '@'
      },
      link: function(scope, element, attrs, ngModel) {

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
    }
  };
});
