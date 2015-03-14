'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:DiscoverCtrl
 * @description
 * # DiscoverCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('DiscoverCtrl',  ['Restangular', '$scope', function (Restangular, $scope) {

    $scope.list = {};
    var Channels = Restangular.all('channels');
    Channels.getList().then(function(result){
      $scope.list = result;
    });


  }]);
