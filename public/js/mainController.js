(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('mainController', mainController)

  mainController.$inject=['$scope','adminService'];

  function mainController($scope, adminService){

    $scope.content = adminService.getContent()

  }
})();
