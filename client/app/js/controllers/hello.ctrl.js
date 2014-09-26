'use strict';

angular.module('znieh')
    .controller('HelloCtrl', function ($scope, Restangular) {

    Restangular.all('hello').getList().then(function(names) {
      $scope.names = names;
    });

});
