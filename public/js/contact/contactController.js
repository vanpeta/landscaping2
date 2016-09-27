(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('contactController', contactController)

  contactController.$inject=['$http','vcRecaptchaService','contactService'];

  function contactController($http, vcRecaptchaService, contactService){
    var vm=this;

    vm.contactEmail = {}
    vm.sendEmail = sendEmail
    vm.display = ''
    vm.showDisplay = false
    vm.captchaSuccess = captchaSuccess
    vm.showbutton = false

    function captchaSuccess (response) {
      console.log("triggered")
      if (response) {
      vm.showbutton = true
      }
    }

    function sendEmail () {
      contactService.sendEmail(vm.contactEmail)

      // console.log(vm.contactEmail)
      // $http({
      //   method:'POST',
      //   url: '/sendemail',
      //   data: vm.contactEmail
      // })
      .then(function(res){
        console.log(res)
        if (res.status==200) {
          vm.showDisplay = true;
          vm.display="Thank you, your message has been sent. We'll respond to you soon."
        } else {
          vm.display='Something went wrong, please try again.'
        }
      })
    }

  }
})();
