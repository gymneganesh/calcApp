
(function() {
  'use strict';

  angular.module('calc.directives', []);
  angular.module('calc.services', []);

  angular
    .module('app', [
      'calc.directives',
      'calc.services',
      'ngRoute',
      'ngAnimate',
      'ngMaterial'
    ])
    .config(config)
    .run(run);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider'];
  // run.$inject = [];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   *
   */
  function config($routeProvider, $locationProvider) {
    // routes
    $routeProvider
      .when('/', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      })
      .otherwise({
        redirectTo: '/404'
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }

  /**
   * Run once the App is ready
   */
  function run() {
    // console.log('App ready!');
  }
})();
