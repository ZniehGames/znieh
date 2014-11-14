'use strict';

angular.module('znieh')
    .controller('LoginCtrl', function ($scope, AuthenticationService, $route, $window, $location) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.$on('event:auth-login-failed', function () {
        });

        $scope.$on('event:auth-login-complete', function () {
            $route.reload();
        });

        $scope.$on('event:auth-login-required', function () {
          $window.sessionStorage.removeItem('token'); // if token has expired
          $window.sessionStorage.removeItem('user');
          $location.path('/');
        });

        $scope.submit = function () {
            AuthenticationService.login($scope.credentials);
        };

});
