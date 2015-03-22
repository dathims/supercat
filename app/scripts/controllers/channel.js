'use strict';

/**
 * @ngdoc function
 * @name supercatApp.controller:ChannelCtrl
 * @description
 * # ChannelCtrl
 * Controller of the supercatApp
 */
angular.module('supercatApp')
  .controller('ChannelCtrl', ['$scope', '$routeParams','geolocation', 'Restangular', 'localStorageService', '$location', 'envConfig', function($scope, $routeParams, geolocation, Restangular, localStorageService, $location, envConfig) {
    var dispatcher = new WebSocketRails(envConfig.production.domain + '/websocket');
    var channelDispatcher = dispatcher.subscribe('channel_' + $routeParams.id);
    $scope.local = localStorageService.get('local');
    var userLocal = localStorageService.get('user');
    $scope.message = {
      latitude: $scope.local.lat,
      longitude: $scope.local.long,
      body: ''
    };

    if (localStorageService.get('user')) {
      $scope.user = localStorageService.get('user');
      $scope.user.gravatar = $scope.user.email_md5;
    } else {
      $location.url('/login');
    }

    var distance = function(lat1, lon1, lat2, lon2) {
      var R = 6371;
      var a =
        0.5 - Math.cos((lat2 - lat1) * Math.PI / 180) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos((lon2 - lon1) * Math.PI / 180)) / 2;

      return R * 2 * Math.asin(Math.sqrt(a));
    };

    var scrollBotChatMessage = function() {
      //document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;
      scrollTo(document.querySelector('.chat-messages'), document.querySelector('.chat-messages').scrollHeight , 600);
    };

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function(){
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) {
        return c/2*t*t + b;
      }
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    channelDispatcher.bind('new_message', function(msg) {

      geolocation.getLocation().then(function(data){
        $scope.local = {lat:data.coords.latitude, long:data.coords.longitude};
        localStorageService.set('local', $scope.local);
      });
      $scope.$apply(function() {
        $scope.channel.messages.push(msg.message);
      });
      scrollBotChatMessage();

    });
    Restangular.one('channels', $routeParams.id).get().then(function(channel) {
      $scope.channel = channel;
      for (var i = 0; i < $scope.channel.messages.length; i++) {
        var lat1 = $scope.channel.messages[i].latitude;
        var lon1 = $scope.channel.messages[i].longitude;
        var lat2 = $scope.local.lat;
        var lon2 = $scope.local.long;
        $scope.channel.messages[i].distance = distance(lat1, lon1, lat2, lon2);
      }
      setTimeout(function(){
        scrollTo(document.querySelector('.chat-messages'), document.querySelector('.chat-messages').scrollHeight , 600);
      }, 300);
    });
    $scope.sendMessage = function() {
      if ($scope.message.body) {
        $scope.channel.all('messages').post({
          message: $scope.message
        }).then(function() {
          $scope.message.body = '';
        });
      }
    };
    if (localStorageService.get('user')) {
      $scope.user = localStorageService.get('user');
      $scope.user.gravatar = $scope.user.email_md5;
    } else {
      $location.url('/login');
    }


  }
]);
