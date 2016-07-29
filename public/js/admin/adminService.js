(function () {
  'use strict';

  angular
    .module("landscaping")
    .factory("adminService", adminService);

adminService.$inject = ['$http']

function adminService ($http) {

    var content ={
    aboutTitle : '',
    aboutSubtitle : '',
    aboutParagraph1 : '',
    aboutParagraph2 : '',
    serviceTitle : '',
    serviceSubtitle : '',
    serviceParagraph1 : '',
    serviceSubtitle2 : '',
    serviceParagraph2 : ''
    }

    function getContent () {
      return content
    }

    function setContent (newContent) {
      content = newContent
    }
    return {
      getContent : getContent,
      setContent : setContent
    }


    // function changeContent (data) {
    //   console.log(data)
    //   var promise = $http({
    //     method: 'PUT',
    //     url: 'api/content',
    //     data: data,
    //   }).then (
    //     function (res) {
    //       return res;
    //     }
    //   )
    //   return promise
    // };
  }
})();
