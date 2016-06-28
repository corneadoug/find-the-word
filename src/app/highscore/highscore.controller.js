(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('HighScoreCtrl', HighScoreCtrl);

  HighScoreCtrl.$inject = ['dataService'];

  function HighScoreCtrl(dataService) {
    var vm = this;
    vm.scores = [];
    vm.tableOptions = {
      rowHeight: 50,
      footerHeight: false,
      scrollbarV: false,
      selectable: false,
      columnMode: 'flex',
      columns: [
        {name: 'Rank', prop: 'rank'},
        {name: 'Name', prop: 'name', flexGrow: 2},
        {name: 'Score', prop: 'score'}
      ]
    };

    loadScores();

    function loadScores() {
      dataService.getScores()
        .then(function(data) {
          vm.scores = data;
        });
    }
  }

})();
