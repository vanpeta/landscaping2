(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('mainController', mainController)

  mainController.$inject=['$scope','adminService'];

  function mainController($scope, adminService){

    $scope.content = adminService.getContent()
    var vm = this;
    vm.slider = slider

    function slider() {
      console.log('clicked')
      setTimeout(function(){
        $('.slider').slider();
      },50)
    }

  }
})();
