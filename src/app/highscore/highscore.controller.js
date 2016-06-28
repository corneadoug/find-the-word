(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('HighScoreCtrl', HighScoreCtrl);

  HighScoreCtrl.$inject = ['dataService'];

  function HighScoreCtrl(dataService) {
    var vm = this;
    vm.scores = [];

    loadScores();

    function loadScores() {
      dataService.getScores()
        .then(function(data) {
          vm.scores = data;
        });
    }
  }

})();
