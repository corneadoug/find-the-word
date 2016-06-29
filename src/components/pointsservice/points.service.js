(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('pointsService', pointsService);

  pointsService.$inject = [];

  function pointsService() {
    var total = 0;
    var service = {
      addPoints: addPoints,
      flushPoints: flushPoints,
      total: total
    };

    function flushPoints() {
      total = 0;
    }

    function addPoints(newPoints) {
      total += newPoints;
    }

    return service;
  }

})();
