(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('gameSessionService', gameSessionService);

  gameSessionService.$inject = ['pointsService'];

  function gameSessionService(pointsService) {
    var service = {};
    service.currentWordIdx = 0;
    service.gameErrors = 0;
    service.gameStart = gameStart;
    service.gameStatus = 'ready';
    service.nextWord = nextWord;
    service.points = pointsService;

    function gameStart() {

    }

    function nextWord() {

    }

    return service;
  }

})();
