'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('NavigationCtrl', function ($scope) {
    $scope.toggleNavOpen = false;
    $scope.toggleNav = function(){
      $scope.toggleNavOpen = !$scope.toggleNavOpen;
      console.log('scope, ', $scope.toggleNavOpen);
    };
  });
