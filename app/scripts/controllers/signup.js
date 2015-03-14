'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('SignupCtrl', ['$scope', '$location', 'geolocation', 'Restangular', 'localStorageService', function($scope, $location, geolocation, Restangular, localStorageService) {
    $scope.user = {};
    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    $scope.submit = function() {
      console.log($scope.user);
      var Users = Restangular.all('users');
      var user = Users.post({user: $scope.user}).then(function(result){
          console.log(result);
          var key = 'user';
          var val = result;
          if(localStorageService.isSupported) {
            localStorageService.set(key, val);
          }
          Restangular.configuration.defaultHeaders['X-CSRF-Token'] = result.auth_token;
          $location.path('/dashboard');
          console.log(user);
        });
    };
  }]);
