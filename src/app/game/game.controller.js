(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('GameCtrl', GameCtrl);

  GameCtrl.$inject = ['dataService', 'playerService', 'pointsService', '$location'];

  function GameCtrl(dataService, playerService, pointsService, $location) {
    var vm = this;
    vm.player = playerService;
    vm.points = pointsService;
    vm.words = [];
    vm.word = 'pizza';
    vm.letters = _.shuffle(vm.word.split(''));
    vm.result = new Array(vm.word.length);

    init();

    function init() {
      if (playerService.name) {
        pointsService.flushPoints();
        loadWords();
      } else {
        $location.path('/');
      }
    }

    function loadWords() {
      dataService.getWords()
        .then(function(data) {
          vm.words = data;
        });
    }
  }

})();
