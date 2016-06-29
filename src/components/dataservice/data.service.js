(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('dataService', dataService);

  dataService.$inject = ['$http', 'ngToast'];

  function dataService($http, ngToast) {
    var service = {
      getScores: getScores,
      getWords: getWords
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
        ngToast.danger({content: 'We couldn\'t fetch the scores'});
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

    function getWords() {
      // Getting everyword since there is only 20
      // In case of a bigger list we would do a RAND() + LIMIT() in the query
      return $http.get('https://findtheword-b856a.firebaseio.com/words.json')
      .then(getWordsSuccess)
      .catch(getWordsError);

      function getWordsError(error) {
        ngToast.danger({content: 'We couldn\'t fetch the words'});
        console.log('getWords Failed.' + error.data);
      }

      function getWordsSuccess(response) {
        // Transform Firebase Data into a classic Array
        // Shuffle the array
        var result = _.shuffle(_.values(response.data));
        return result;
      }
    }

    return service;
  }

})();
