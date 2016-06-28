(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['playerService', '$location'];

  function HomeCtrl(playerService, $location) {
    var vm = this;
    vm.player = playerService;
    vm.startTheGame = startTheGame;

    function startTheGame() {
      if (playerService.name) {
        $location.path('/play');
      }
    }
  }

})();
