'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:CreateRoomCtrl
 * @description
 * # CreateRoomCtrl
 * Controller of the supercatApp
 */

 //
 //:latitude, :longitude, :creator_id, :title
angular.module('supercatApp')
  .controller('CreateRoomCtrl', ['Restangular', '$scope','localStorageService', '$location',
    function (Restangular, $scope, localStorageService, $location) {
    $scope.channel = {};
    var Channels = Restangular.all('channels');
    $scope.geo = localStorageService.get('local');
    $scope.user = localStorageService.get('user');
    $scope.channel.longitude = $scope.geo.long;
    $scope.channel.latitude = $scope.geo.lat;
    
    $scope.createChannel = function(){
      Channels.post({channel: $scope.channel}).then(function(result){
        $location.path('/dashboard');
      });
    };
  }]);
