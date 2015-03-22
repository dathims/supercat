'use strict';

/**
 * @ngdoc overview
 * @name supercatApp
 * @description
 * # supercatApp
 *
 * Main module of the application.
 */
angular
  .module('supercatApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'geolocation',
    'ngMaterial',
    'restangular',
    'LocalStorageModule',
    'angularMoment'
  ])
  .constant('envConfig', {
        production: {
            domain: 'supertiger.herokuapp.com',
            isSSL: true
        },
        development: {
          domain: 'localhost:3000',
          isSSL: false
        }

  })
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .when('/discover', {
        templateUrl: 'views/discover.html',
        controller: 'DiscoverCtrl'
      })
      .when('/create-room', {
        templateUrl: 'views/create-room.html',
        controller: 'CreateRoomCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'MainCtrl'
      })
      .when('/channels/:id', {
        templateUrl: 'views/channel.html',
        controller: 'ChannelCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  .config(function(RestangularProvider, envConfig) {
    var prefix;
    if(envConfig.isSSL) {
      prefix = 'https://';
    } else {
      prefix = 'http://';
    }
    RestangularProvider.setBaseUrl(prefix + envConfig.production.domain);
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});
  })
  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('_supercat');
  })
  .run(function(localStorageService, Restangular) {
    if (localStorageService.get('user')) {
      Restangular.configuration.defaultHeaders['X-CSRF-Token'] = localStorageService.get('user').auth_token;
    }


  });
