(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('playerService', playerService);

  playerService.$inject = [];

  function playerService() {
    var name = 'Teddy';
    var service = {
      flushPlayer: flushPlayer,
      name: name,
      setPlayer: setPlayer
    };

    function flushPlayer() {
      name = '';
    }

    function setPlayer(playerName) {
      name = playerName;
    }

    return service;
  }

})();
