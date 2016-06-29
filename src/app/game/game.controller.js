(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('GameCtrl', GameCtrl);

  GameCtrl.$inject = [
    'dataService',
    'playerService',
    'pointsService',
    '$location',
    'gameSessionService'
  ];

  function GameCtrl(dataService, playerService, pointsService, $location, gameSessionService) {
    var vm = this;
    vm.cleanLettersArray = cleanLettersArray;
    vm.game = gameSessionService;
    vm.letters = [];
    vm.player = playerService;
    vm.points = pointsService;
    vm.removeLetter = removeLetter;
    vm.result = [];
    vm.validateWord = validateWord;
    vm.word = '';
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

    function cleanLettersArray() {
      vm.letters = _.compact(vm.letters);
    }

    function loadWords() {
      dataService.getWords()
        .then(function(data) {
          vm.words = data;
        });
    }

    function removeLetter(index) {
      vm.letters.push(vm.result[index]);
      vm.cleanLettersArray();
      vm.result[index] = undefined;
    }

    function validateWord() {

    }
  }

})();
