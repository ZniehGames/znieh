'use strict';

// you can use the global config (define by client/config/main.json)

var app = angular.module('znieh', [
  'ngRoute',
  'restangular',
  'toastr',
  'btford.socket-io'
]);

app.config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl(config.api);

    $routeProvider.
      when('/', {
        templateUrl: 'partials/homepage/index.html',
      }).
      when('/hello', {
        templateUrl: 'partials/hello.html',
        controller: 'HelloCtrl'
      }).
      when('/fight', {
        templateUrl: 'partials/fightpage/index.html',
      }).
      when('/search', {
        templateUrl: 'partials/fightsearch/index.html',
      }).
      otherwise({
        redirectTo: '/'
      });

});

app.run(function(Restangular, $rootScope, $window) {

    if ($window.sessionStorage.token) {
        Restangular.setDefaultHeaders({Authorization:'Bearer ' + $window.sessionStorage.token});
    }

    Restangular.setErrorInterceptor(function(response) {
        if(response.status === 401) {
            $rootScope.$broadcast('event:auth-login-required');
            return false;
        }
        return true;
    });
});
