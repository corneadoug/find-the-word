(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('dataService', dataService);

  dataService.$inject = ['$http'];

  function dataService($http, logger) {
    return {
      getScores: getScores
    };

    function getScores() {
      // Using this instead of params since parameter's order is important in Firebase
      var limitToLast = 'limitToLast=50';
      var orderBy = 'orderBy="score"';

      return $http.get('https://findtheword-b856a.firebaseio.com/scores.json?' +
        orderBy + '&' + limitToLast
      )
      .then(getScoresSuccess)
      .catch(getScoresError);

      function getScoresError(error) {
        console.log('getScores Failed.' + error.data);
      }

      function getScoresSuccess(response) {
        // Transform Firebase Data into a classic Array ordered by score
        // Add add an index for the score's rank
        var result = _.each(_.orderBy(_.values(response.data), 'score', 'desc'), function(elt, i) {
          elt.rank = i + 1;
        });
        return result;
      }
    }
  }

})();
