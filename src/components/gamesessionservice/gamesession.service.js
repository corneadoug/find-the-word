(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('gameSessionService', gameSessionService);

  gameSessionService.$inject = [
    'pointsService',
    'wordsService',
    'ngToast',
    '$interval',
    'playerService',
    'dataService'
  ];

  function gameSessionService(pointsService, wordsService, ngToast, $interval, playerService, dataService) {
    var service = {};
    service.currentWordIdx = -1;
    service.gameErrors = 0;
    service.gameStart = gameStart;
    service.gameStatus = 'ready';
    service.gameStop = gameStop;
    service.letters = [];
    service.nextWord = nextWord;
    service.reset = reset;
    service.startTimer = startTimer;
    service.stopTimer = stopTimer;
    service.timeLeft = 40;
    service.timer = null;
    service.wordResult = [];

    function gameStart() {
      if (wordsService.list.length > 0) {
        service.gameStatus = 'ongoing';
        service.nextWord();
        service.startTimer();
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
        service.wordResult = new Array(word.length);
        service.letters = _.shuffle(word.split(''));
      } else {
        service.currentWordIdx = -1;
        service.nextWord();
      }
    }

    function reset() {
      pointsService.flushPoints();
      wordsService.shuffleWords();
      service.currentWordIdx = -1;
      service.gameErrors = 0;
      service.letters = [];
      service.timeLeft = 40;
      service.timer = null;
      service.wordResult = [];
      service.gameStart();
    }

    function startTimer() {
      service.timer = $interval(function () {
        if (service.timeLeft - 1 >= 0) {
          service.timeLeft -= 1;
          if (service.timeLeft === 0) {
            service.stopTimer();
          }
        }
      }, 1000);
    }

    function stopTimer() {
      $interval.cancel(service.timer);
      service.gameStatus = 'finished';
      dataService.sendScores({name: playerService.name, score: pointsService.total});
    }

    return service;
  }

})();
