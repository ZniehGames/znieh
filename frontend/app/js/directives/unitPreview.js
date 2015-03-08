'use strict';

angular.module('znieh')
  .directive('unitPreview', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/directives/unit-preview.html',
      scope: { unit : '='}
    };
});
