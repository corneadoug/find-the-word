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
    service.shuffleWords = shuffleWords;

    function fetchWords() {
      dataService.getWords()
        .then(function(data) {
          service.list = data;
        });
    }

    function shuffleWords() {
      service.list = _.shuffle(service.list);
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
