(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('workController', workController)

  workController.$inject=['$http'];

  function workController(){
    var vm=this;
    vm.test="testing"

  }
})();
