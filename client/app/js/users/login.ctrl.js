'use strict';

angular.module('znieh')
    .controller('LoginCtrl', function ($scope, AuthenticationService, SocketService, $route) {

        $scope.$watch(AuthenticationService.isLoggedIn, function(value) {
            $scope.hideLoginForm = value;
        });

        $scope.$watch(AuthenticationService.currentUser, function(value) {
            console.log('currentUser', value);
            if (value !== undefined) {
                $scope.username = value;
                SocketService.emit('authenticate', value);
            }
        });

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
