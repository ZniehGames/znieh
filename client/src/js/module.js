'use strict';

var app = angular.module('znieh', [
  'ngRoute',
  'restangular',
]);

app.config(function ($interpolateProvider, $routeProvider, RestangularProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');

    RestangularProvider.setBaseUrl('/api');

});
