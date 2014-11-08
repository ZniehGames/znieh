'use strict';

angular.module('znieh')
    .controller('RegistrationCtrl', function ($scope, Restangular, toastr, AuthenticationService) {

    $scope.user = {username: '', plainPassword: '', email: ''};

    $scope.submit = function() {
      Restangular.all('users').post($scope.user).then(function() {
          toastr.success('Félicitations ton compte a bien été enregistré, tu vas pouvoir jouer !', 'Bienvenue sur Znieh');
          AuthenticationService.login({username: $scope.user.username, password: $scope.user.plainPassword});
      }, function() {
        toastr.error('Tu n\'pas l\'air tout à fait prêt !', 'Oops !');
      });
    };

});
