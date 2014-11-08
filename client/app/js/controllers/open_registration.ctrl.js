'use strict';

angular.module('znieh')
    .controller('OpenRegistrationCtrl', function ($scope, AuthenticationService, $routeParams) {
    $scope.openRegistration = '1' === $routeParams.openRegistration;

    $scope.$watch(AuthenticationService.isLoggedIn, function (isLoggedIn) {
      $scope.isLoggedIn = isLoggedIn;
    });
});
