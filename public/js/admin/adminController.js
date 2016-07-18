(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('adminController', adminController)

  adminController.$inject=['$http', 'Upload'];

  function adminController($http, Upload){
    var vm=this;
    vm.test="testing"
    vm.uploadImageForm
    vm.sendToImgur=sendToImgur
    vm.deleteImage=deleteImage
    var albumDeletehash = "8dTjIP45GplZuc0"
    var albumId = "fKeE0"
    vm.images= []
    var imgurClient=''
    var ids = []

// GET Imgur Client Key from the back-end
    $http({
      method: 'GET',
      url: '/api/imgurKey'
    }).then(
      function (res) {
        imgurClient = res.data
        getAlbumImages()
      }
    );

//CREATE Album
    function createAlbum () {
      $http({
        method: 'POST',
        url: 'https://api.imgur.com/3/album',
        data: {'title': 'S & P Hanson Landscaping Professional Landscape Services'},
        headers: {'Authorization': 'Client-ID '+imgurClient}
      }).then(
        function (res) {
          albumId = res.data.data.id
          albumDeletehash = res.data.data.deletehash
          console.log(albumId)
        }
      )
    };

    function sendToImgur () {
      if (!albumId) {
        console.log('album not detected')
        createAlbum()
      }
      else {
        console.log('album detected')
//Transform selected image to 64 binary code
        var fileReader = new FileReader();
        fileReader.readAsArrayBuffer(vm.uploadImageForm);
        fileReader.onload = function(e) {
          $http({
            url: 'upload',
            header: {'Content-Type': vm.uploadImageForm.type},
            data: e.target.result
          }).then (function(response) {

          },null, function(evt) {
            vm.progress[index] = parseInt(100.0 * evt.loaded / evt.total)
          });
          console.log('image transformation completed')
        }
//UPLOAD selected image
        console.log('uploading image starting')
        var promise = $http({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          data: vm.uploadImageForm,
          headers: {'Authorization': 'Client-ID '+imgurClient}
        }).then(
          function(res) {
            console.log(res)
            ids.push(res.data.data.id)
            console.log("SUCCESS!!! the new image uploaded id is "+ids[0])
            addImageToAlbum();
          }
        );
      }
    }

//ADD selected image to Album
    function addImageToAlbum () {
      console.log('addImageToAlbum triggered')
      console.log('this is the ids inside the function addimage to album '+ids)
      var promise = $http({
        method: 'PUT',
        url: 'https://api.imgur.com/3/album/'+albumDeletehash+'/add',
        data: {'ids': ids},
        headers: {'Authorization': 'Client-ID '+imgurClient}
      });
      promise.then(
        function(res) {
          console.log(res)
          console.log('image added to album')
          getAlbumImages()
        }
      )
    }

// GET Album images
    function getAlbumImages () {
      console.log('getAlbumImages triggered')
      $http({
        method: 'GET',
        url: 'https://api.imgur.com/3/album/'+albumId+'/images',
        headers: {'Authorization': 'Client-ID '+imgurClient}
      }).then(
        function (res) {
          vm.images = res.data.data
          console.log(vm.images)
        }
      )
    };

    function deleteImage (image) {
      console.log('deleteImage Triggered')
      console.log(image)
      var index = vm.images.indexOf(image)
      console.log(index)
      vm.images.splice(index,1);
      var imagesIds = []
      vm.images.forEach(function(e) {
        imagesIds.push(e.id)
      })
      console.log('this is vm.images after forEach method:')
      console.log(vm.images)
      console.log('this is imagesIds after forEach method:')
      console.log(imagesIds)

      var promise = $http({
        method: 'PUT',
        url: 'https://api.imgur.com/3/album/'+albumDeletehash,
        headers: {'Authorization': 'Client-ID '+imgurClient},
        data:{'ids': imagesIds}
      }).then (
        function (res) {
          console.log(res)
        }
      )
    }

  }
})();





