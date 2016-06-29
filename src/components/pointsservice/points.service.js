(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('pointsService', pointsService);

  pointsService.$inject = [];

  function pointsService() {
    var service = {};
    service.total = 0;
    service.addGamePoints = addGamePoints;
    service.calculateWordMaxScore = calculateWordMaxScore;
    service.flushPoints = flushPoints;

    function flushPoints() {
      service.total = 0;
    }

    function addGamePoints(newPoints) {
      service.total += newPoints > 0 ? newPoints : 0;
    }

    function calculateWordMaxScore(length) {
      return length > 0 ? Math.floor(Math.pow(1.95, (length/3))) : 0;
    }

    return service;
  }

})();
