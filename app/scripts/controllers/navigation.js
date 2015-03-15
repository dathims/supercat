'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('NavigationCtrl', ['$scope','localStorageService', '$location', '$rootScope', function ($scope, localStorageService, $location, $rootScope) {
    $rootScope.toggleNavOpen = false;
    $rootScope.toggleNav = function(){
      $rootScope.toggleNavOpen = !$rootScope.toggleNavOpen;
    };
    $scope.disconnectProfil = function() {
      $location.path('/login');
      return localStorageService.clearAll();
    };
  }]);
