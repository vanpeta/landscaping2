(function () {
  'use strict';

  angular
    .module("landscaping")
    .factory("contactService", contactService);

contactService.$inject = ['$http']

  function contactService ($http) {

    function sendEmail (contactEmail) {
      console.log(contactEmail)
      var promise =
      $http({
        method:'POST',
        url: '/sendemail',
        data: contactEmail
      })
      return promise
    }


      return {
        sendEmail: sendEmail
      }
  }
})();
