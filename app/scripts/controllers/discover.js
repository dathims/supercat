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
    var Channels = Restangular.all('channels');
    $scope.list = [];
    $scope.users =[];

    $scope.getUsers = function (channel_id) {
      Restangular.one('channels', channel_id).all('users').getList().then(function(result){
        $scope.users[channel_id] = result;
      });
    }

    Channels.getList().then(function(result){
      $scope.list = result;
      for (var i = 0; i < result.length; i++) {
        $scope.getUsers(result[i].id);
      }
    });


  }]);
