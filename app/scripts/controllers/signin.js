'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('SigninCtrl', ['$scope', '$location', 'geolocation', 'Restangular', 'localStorageService', function($scope, $location, geolocation, Restangular, localStorageService) {
    if(localStorageService.isSupported) {
      if(localStorageService.get('user')){
        $location.path('dashboard');
      }
    }
    $scope.user = {};
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    $scope.displayPassword = true;
    $scope.togglePassword = function(){
      $scope.displayPassword = !$scope.displayPassword;
    };

    $scope.submit = function() {
      var Users = Restangular.all('users');
      if (!$scope.displayPassword) {
        Users.customPOST({user: $scope.user}, 'password').then(function(result){
          console.log(result);
          $location.path('/dashboard');
        });
      } else {
        console.log($scope.user);
        Users.customPOST({user: $scope.user}, 'sign_in').then(function(result){
          console.log(result);
          var key = 'user';
          var val = result;
          if(localStorageService.isSupported) {
            localStorageService.set(key, val);
          }
          Restangular.configuration.defaultHeaders['X-CSRF-Token'] = result.auth_token;
          $location.path('/dashboard');
        });
      }
    };
  }]);
