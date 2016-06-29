(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['playerService', '$location', 'wordsService', 'ngToast'];

  function HomeCtrl(playerService, $location, wordsService, ngToast) {
    var vm = this;
    vm.player = playerService;
    vm.startTheGame = startTheGame;

    init();

    function init() {
      wordsService.fetchWords();
    }

    function startTheGame() {
      if (playerService.name) {
        $location.path('/play');
      }
    }
  }

})();
