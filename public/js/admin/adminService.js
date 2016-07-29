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

    function loadContent () {
      console.log('load content triggered')
      $http({
        method:'GET',
        url:'/api/content'
      }).then(
        function(res){
          content.aboutTitle = res.data[0].aboutTitle
          content.aboutSubtitle = res.data[0].aboutSubtitle
          content.aboutParagraph1 = res.data[0].aboutParagraph1
          content.aboutParagraph2 = res.data[0].aboutParagraph2
          content.serviceTitle = res.data[0].serviceTitle
          content.serviceSubtitle = res.data[0].serviceSubtitle
          content.serviceParagraph1 = res.data[0].serviceParagraph1
          content.serviceSubtitle2 = res.data[0].serviceSubtitle2
          content.serviceParagraph2 = res.data[0].serviceParagraph2
        }
      );
    };
    loadContent()

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
