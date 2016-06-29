(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('GameCtrl', GameCtrl);

  GameCtrl.$inject = ['dataService', 'playerService', 'pointsService', '$location'];

  function GameCtrl(dataService, playerService, pointsService, $location) {
    var vm = this;
    vm.letters = [];
    vm.player = playerService;
    vm.points = pointsService;
    vm.result = [];
    vm.validateWord = validateWord;
    vm.word = '';
    vm.wordFilled = false;
    vm.words = [];


    init();

    function init() {
      if (playerService.name) {
        pointsService.flushPoints();
        loadWords();

        // Temporary init until game logic is here
        vm.word = 'pizza';
        vm.result = new Array(vm.word.length);
        vm.letters = _.shuffle(vm.word.split(''));

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

    function validateWord() {

    }
  }

})();
