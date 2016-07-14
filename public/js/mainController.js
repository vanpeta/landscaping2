(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('mainController', mainController)

  mainController.$inject=[];

  function mainController(){
    var vm=this;
    vm.test="testing"

  }
})();
