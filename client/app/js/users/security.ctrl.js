'use strict';

angular.module('znieh')
    .controller('SecurityCtrl', function ($scope, $location, $window) {

    $scope.$on('event:auth-login-required', function () {
      delete $window.sessionStorage.token; // if token has expired
      delete $window.sessionStorage.user;
      $location.path('/');
    });

});
