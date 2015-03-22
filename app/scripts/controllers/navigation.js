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
    $scope.toggleNav = function(){
      $scope.toggleNavOpen = !$scope.toggleNavOpen;
      console.log($scope.toggleNavOpen);
    };
    $scope.disconnectProfil = function() {
      $location.path('/login');
      return localStorageService.clearAll();
    };
  }]).directive('ngClickOrig', ['$parse', function($parse) {
      return {
        compile: function($element, attr) {
          var fn = $parse(attr.ngClickOrig);
          return function handler(scope, element) {
            element.on('click', function(event) {
              scope.$apply(function() {
                fn(scope, {$event:event});
              });
            });
          };
        }
     };
 }]);;
