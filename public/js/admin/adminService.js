(function () {
  'use strict';

  angular
    .module("landscaping")
    .factory("adminService", adminService);

adminService.$inject = ['$http']

function adminService ($http) {

  function create(data) {
    var promise = $http({
      method: 'POST',
      url:    '/api/admins',
      data:   data
      });
    return promise;
  }

    var content ={
    caption1 : '',
    caption2 : '',
    caption3 : '',
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
          content.caption1 = res.data[0].caption1
          content.caption2 = res.data[0].caption2
          content.caption3 = res.data[0].caption3
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
      console.log(newContent)
      var data = newContent
      $http({
        method: 'PUT',
        url: 'api/content',
        data: data,
      }).then (
        function (res) {
          content.caption1 = res.data.caption1
          content.caption2 = res.data.caption2
          content.caption3 = res.data.caption3
          content.aboutTitle = res.data.aboutTitle
          content.aboutSubtitle = res.data.aboutSubtitle
          content.aboutParagraph1 = res.data.aboutParagraph1
          content.aboutParagraph2 = res.data.aboutParagraph2
          content.serviceTitle = res.data.serviceTitle
          content.serviceSubtitle = res.data.serviceSubtitle
          content.serviceParagraph1 = res.data.serviceParagraph1
          content.serviceSubtitle2 = res.data.serviceSubtitle2
          content.serviceParagraph2 = res.data.serviceParagraph2
        }
      )
    }

    return {
      getContent : getContent,
      setContent : setContent,
      create: create
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
