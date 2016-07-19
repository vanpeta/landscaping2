(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('contactController', contactController)

  contactController.$inject=['$http'];

  function contactController($http){
    var vm=this;

    vm.contactEmail = {}
    vm.sendEmail = sendEmail

    function sendEmail () {
      $http({
        method:'POST',
        url: '/sendemail',
        data: vm.contactEmail
      }).then(function(res){

      })

    }

  }
})();
