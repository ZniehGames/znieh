'use strict';

angular.module('znieh')
    .controller('LoginCtrl', function ($scope, AuthenticationService, SocketService, $route) {

        $scope.$watch(AuthenticationService.isLoggedIn, function(isLoggedIn) {
            $scope.hideLoginForm = isLoggedIn;
        });

        $scope.$watch(AuthenticationService.currentUser, function(user) {
            if (user) {
                $scope.username = user.username;
                SocketService.emit('authenticate', user);
            }
        }, true);

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

        $scope.logout = function () {
            AuthenticationService.logout();
        };
});
