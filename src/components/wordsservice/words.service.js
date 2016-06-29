(function() {
  'use strict';

  angular.module('findTheWord')
    .factory('wordsService', wordsService);

  wordsService.$inject = ['dataService'];

  function wordsService(dataService) {
    var service = {};
    service.fetchWords = fetchWords;
    service.getWordAt = getWordAt;
    service.list = [];

    function fetchWords() {
      dataService.getWords()
        .then(function(data) {
          service.list = data;
        });
    }

    function getWordAt(idx) {
      if (service.list[idx]) {
        return service.list[idx].word;
      }
      return null;
    }

    return service;
  }

})();
