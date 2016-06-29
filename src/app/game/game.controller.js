(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('GameCtrl', GameCtrl);

  GameCtrl.$inject = [
    'dataService',
    'playerService',
    'pointsService',
    '$location',
    'gameSessionService',
    'wordsService'
  ];

  function GameCtrl(dataService, playerService, pointsService, $location, gameSessionService, wordsService) {
    var vm = this;
    vm.session = gameSessionService;
    vm.cleanLettersArray = cleanLettersArray;
    vm.player = playerService;
    vm.points = pointsService;
    vm.removeLetter = removeLetter;
    vm.validateWord = validateWord;

    init();

    function init() {
      if (playerService.name) {
        pointsService.flushPoints();
      } else {
        $location.path('/');
      }
    }

    function cleanLettersArray() {
      gameSessionService.letters = _.compact(gameSessionService.letters);
    }

    function removeLetter(index) {
      gameSessionService.letters.push(gameSessionService.wordResult[index]);
      vm.cleanLettersArray();
      gameSessionService.wordResult[index] = undefined;
      gameSessionService.gameErrors += 1;
    }

    function validateWord() {
      var finalWord = _.map(gameSessionService.wordResult).join('');
      if (finalWord === wordsService.list[gameSessionService.currentWordIdx].word) {
        pointsService.addGamePoints(
          pointsService.calculateWordMaxScore(finalWord.length) + (gameSessionService.gameErrors * -1)
        );
        gameSessionService.nextWord();
      } else {
        console.log('Wrong word!');
      }
    }
  }

})();
