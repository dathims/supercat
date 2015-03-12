'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('SignupCtrl', ['$scope', '$location', 'geolocation', 'Restangular', function($scope, $location, geolocation, Restangular) {

    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });

    $scope.submit = function() {
      var Users = Restangular.all('users');
      var user = Users.post({user: $scope.user});
      console.log(user);
      $location.path('/main');
    };
  }]);
