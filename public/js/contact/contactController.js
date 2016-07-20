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
    vm.display = ''
    vm.showDisplay = false

    function sendEmail () {
      $http({
        method:'POST',
        url: '/sendemail',
        data: vm.contactEmail
      }).then(function(res){
        console.log(res)
        if (res.status==200) {
          vm.showDisplay = true;
          vm.display="Thank you, your message has been sent. We'll respond you soon."
        } else {
          vm.display='Something went wrong, please try again.'
        }
      })
    }

  }
})();
