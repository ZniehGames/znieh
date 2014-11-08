'use strict';

angular.module('znieh')
    .factory('AuthenticationService', function ($rootScope, $http, $window, Restangular) {

        return {
            login: function (credentials) {
                $http
                    .post(config.api + '/login_check', credentials, { ignoreAuthModule: true })
                    .success(function (data) {
                        $window.sessionStorage.token = data.token;
                        $window.sessionStorage.user = data.user.username;
                        Restangular.setDefaultHeaders({Authorization:'Bearer ' + data.token});
                        $rootScope.$broadcast('event:auth-login-complete');
                    })
                    .error(function (data, status) {
                        $rootScope.$broadcast('event:auth-login-failed', status);
                    });
            },
            logout: function () {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                Restangular.setDefaultHeaders({});
                $rootScope.$broadcast('event:auth-logout-complete');
            },
            isLoggedIn: function() { return $window.sessionStorage.user !== 'undefined'; },
            currentUser: function() { return $window.sessionStorage.user; }
        };
});
