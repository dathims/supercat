'use strict';

/**
 * @ngdoc service
 * @name supercatApp.users
 * @description
 * # users
 * Service in the supercatApp.
 */
angular.module('supercatApp')
  .factory('UserServ', ['$scope', '$location', 'Restangular', 'localStorageService', function ($scope, $location, Restangular, localStorageService) {
    //Restangular.configuration.defaultHeaders['X-CSRF-Token'] = localStorageService.get('user').auth_token;
    var factory = {};
    factory.authent = function(){
      if (localStorageService.get('user')) {
        $scope.user = localStorageService.get('user');
        $scope.user.gravatar = $scope.user.email_md5;
      } else {
        $location.url('/login');
      }
      console.log('user authent');
    }
    return factory;
  }]);
