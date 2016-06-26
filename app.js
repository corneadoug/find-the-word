(function() {
  'use strict';

  angular.module('findTheWord', ['ui.bootstrap', 'ngRoute', 'ngAnimate']);

  angular.module('findTheWord')
    .config(AppConfig);

  angular.module('findTheWord')
    .run(RunUtils);

  function AppConfig($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
      })
      .otherwise({redirectTo:'/'});

    $locationProvider.html5Mode(true);
  }

  function RunUtils($rootScope) {
    $rootScope.safeApply = function(fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  }

})();
