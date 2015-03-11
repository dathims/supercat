'use strict';

/**
 * @ngdoc service
 * @name supercatApp.login
 * @description
 * # login
 * Service in the supercatApp.
 */
angular.module('supercatApp')
  .service('userService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.signup = function(jsonobject) {
      $http.post('http://localhost:3000/users', jsonobject).
        success(function(data) {
          console.log('succes :', data);
        }).
        error(function(data) {
          console.log('Error: ',data);
        });
    };

    this.signin = function(jsonobject) {
      $http.post('http://localhost:3000/users/sign_in', jsonobject).
        success(function(data) {
          console.log('succes sigin :', data);
        }).
        error(function(data) {
          console.log('Error sigin: ',data);
        });
    };
  }]);
