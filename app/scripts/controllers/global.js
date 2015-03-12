'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:GlobalCtrl
 * @description
 * # GlobalCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('GlobalCtrl', ['$scope', function ($scope) {
    $scope.isVisible = 'true';
  }]);
