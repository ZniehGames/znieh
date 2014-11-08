'use strict';

angular.module('znieh')
    .controller('LoginCtrl', function ($scope, AuthenticationService, $route) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.$on('event:auth-login-failed', function () {
        });

        $scope.$on('event:auth-login-complete', function () {
            $route.reload();
        });

        $scope.submit = function () {
            AuthenticationService.login($scope.credentials);
        };

});
