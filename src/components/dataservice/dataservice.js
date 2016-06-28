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
      let limitToLast = 'limitToLast=50';
      let orderBy = 'orderBy="score"';

      return $http.get('https://findtheword-b856a.firebaseio.com/scores.json?' +
        orderBy + '&' + limitToLast
      )
      .then(getScoresSuccess)
      .catch(getScoresError);

      function getScoresError(error) {
        console.log('getScores Failed.' + error.data);
      }

      function getScoresSuccess(response) {
        return response.data;
      }
    }
  }

})();
