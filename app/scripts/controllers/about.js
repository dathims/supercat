'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
