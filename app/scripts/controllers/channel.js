'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the supercatApp
 */

 angular.module('supercatApp').controller('ChannelCtrl', ['$scope', '$routeParams', 'Restangular', 'localStorageService',
  function($scope, $routeParams, Restangular, localStorageService){
    var dispatcher = new WebSocketRails('localhost:3000/websocket');
    var channelDispatcher = dispatcher.subscribe('channel_' + $routeParams.id);
    var local = localStorageService.get('local');
    $scope.message = {
      latitude: local.lat,
      longitude: local.long,
      body: ""
    }
    channelDispatcher.bind('new_message', function(data) {
      $scope.$apply(function(){
        $scope.channel.messages.push(data);
      });
    });
    Restangular.one('channels', $routeParams.id).get().then(function(channel){
      $scope.channel = channel;
      console.log(channel);
    });
    $scope.sendMessage = function(){
      if($scope.message.body){
        $scope.channel.all('messages').post({message: $scope.message}).then(function(){
          $scope.message.body = '';
        });
      }
    };  
 }]);