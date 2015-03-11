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
  .controller('CreateRoomCtrl', ['Restangular', '$scope','localStorageService' , function (Restangular, $scope, localStorageService) {
    $scope.createroom = function(){
      var Channels = Restangular.all('channels');
      $scope.geo = localStorageService.get('local');
      $scope.user = localStorageService.get('user');
      Restangular.configuration.defaultHeaders = {'X-CSRF-Token': $scope.user.auth_token};

      $scope.channel = {};
      $scope.channel.longitude = $scope.geo.long;
      $scope.channel.latitude = $scope.geo.lat;
      $scope.channel.title = $scope.room.title;

      Channels.post({channel: $scope.channel}).then(function(result){
        console.log(result);
      })
    };
  }]);
