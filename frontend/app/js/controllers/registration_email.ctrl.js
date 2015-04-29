'use strict';

angular.module('znieh')
    .controller('RegistrationEmailCtrl', function ($scope, Restangular, toastr) {

    $scope.user = {email: ''};

    $scope.submit = function() {
      Restangular.all('emails').post($scope.user).then(function(){
        toastr.success('Félicitations ton email a bien été enregistré, tu pourras jouer avant tout les autres !', 'Bienvenue sur Znieh');
      }, function() {
      });
    };

});
