(function() {
  'use strict';

  angular.module('findTheWord')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl() {
    var vm = this;
    vm.name = 'Woldeu';
  }

})();
