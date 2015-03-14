'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('MainCtrl', ['Restangular', '$scope','localStorageService', '$location', 'geolocation', function(Restangular, $scope, localStorageService, $location, geolocation) {



    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      localStorageService.set('local', $scope.coords);
    });

    if(!localStorageService.isSupported) {
      return;
    }

    if(!localStorageService.get('local')) {
      //
    }

    if (localStorageService.get('user')) {
      $scope.user = localStorageService.get('user');
      $scope.user.gravatar = $scope.user.email_md5;
    } else {
      $location.url('/signin');
    }
    // var User = $resource('http://localhost:3000/users/:id.json', {
    //   id: '@id'
    // }, {update: {method: 'PUT'}});
    //
    // $http.defaults.headers.common['X-CSRF-Token'] = '3PjSmojuqhYL8YaOuWpbGQ';
    //
    // User.get({
    //   id: 6
    // }, function(user) {
    //   console.log(user);
    // });
    //
    // User.update({id: 6}, {user: {latitude: 42}});
    //

    /*************/
    //
    //
    // var Users = Restangular.allUrl('users');
    // Users.get(6).then(function(result){
    //   $scope.user = result;
    //   $scope.user.latitude = '50';
    //   $scope.user.put();
    // });

  }]);
