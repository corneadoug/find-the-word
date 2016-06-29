(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('gameSessionService', gameSessionService);

  gameSessionService.$inject = ['pointsService', 'wordsService', 'ngToast'];

  function gameSessionService(pointsService, wordsService, ngToast) {
    var service = {};
    service.currentWordIdx = -1;
    service.gameErrors = 0;
    service.gameStart = gameStart;
    service.gameStatus = 'ready';
    service.gameStop = gameStop;
    service.nextWord = nextWord;
    service.reset = reset;
    service.wordResult = [];
    service.letters = [];

    function gameStart() {
      if (wordsService.list.length > 0) {
        service.gameStatus = 'ongoing';
        service.nextWord();
      } else {
        ngToast.danger({content: 'No Words to play with, Can\'t start :('});
      }
    }

    function gameStop() {
      service.gameStatus = 'finished';
    }

    function nextWord() {
      service.currentWordIdx += 1;
      service.gameErrors = 0;
      var word = wordsService.getWordAt(service.currentWordIdx);
      if (word) {
        console.log('word? %o', word);
        service.wordResult = new Array(word.length);
        service.letters = _.shuffle(word.split(''));
      } else {
        service.currentWordIdx = -1;
        service.nextWord();
      }
    }

    function reset() {
      pointsService.flushPoints();
    }

    return service;
  }

})();
