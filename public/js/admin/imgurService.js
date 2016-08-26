(function () {
  'use strict';

  angular
    .module("landscaping")
    .factory("imgurService", imgurService);

imgurService.$inject = ['$http']

  function imgurService ($http) {

    function convertTo64 (image) {
      return new Promise(function (resolve, reject) {
        var params = null
        var reader = new FileReader()
        var b64 = ""
        reader.onload = function () {
          b64 = reader.result.split(',')[1];
          resolve(b64)
        };
        reader.readAsDataURL(image);
      })
    }
    function uploadImage (image) {
      var promise = $http({
        method: 'POST',
        url: '/imgur/upload',
        data: {image: image}
      })
      return promise
    }

    // GET Album images
    function getAlbumImages () {
      var promise = $http({
        method: 'GET',
        url: '/imgur'
      });
      return promise
    };

    function updateImage () {

    }

    return {
      uploadImage: uploadImage,
      getAlbumImages: getAlbumImages,
      convertTo64: convertTo64,
      updateImage: updateImage
    }
  }
})();

