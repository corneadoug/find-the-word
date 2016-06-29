(function() {
  'use strict';

  angular.module('findTheWord', [
    'ui.bootstrap',
    'ngRoute',
    'ngAnimate',
    'data-table',
    'ngDragDrop',
    'ngToast',
    'angular-svg-round-progressbar'
  ]);

  angular.module('findTheWord')
    .config(AppConfig);

  angular.module('findTheWord')
    .run(RunUtils);

  function AppConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home',
      })
      .when('/highscore', {
        templateUrl: 'src/app/highscore/highscore.html',
        controller: 'HighScoreCtrl',
        controllerAs: 'highscore',
      })
      .when('/play', {
        templateUrl: 'src/app/game/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game',
      })
      .otherwise({redirectTo:'/'});
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
