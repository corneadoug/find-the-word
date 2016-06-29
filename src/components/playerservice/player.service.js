(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('playerService', playerService);

  playerService.$inject = [];

  function playerService() {
    var service = {};
    service.flushPlayer = flushPlayer;
    service.name = 'Teddy';
    service.setPlayer = setPlayer;

    function flushPlayer() {
      service.name = '';
    }

    function setPlayer(playerName) {
      service.name = playerName;
    }

    return service;
  }

})();
