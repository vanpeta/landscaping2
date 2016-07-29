(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('adminController', adminController)

  adminController.$inject=['$http', 'Upload', 'adminService', '$scope'];

  function adminController($http, Upload, adminService, $scope){
    var vm=this;
    vm.test="testing"
    vm.ImageForm ={}
    vm.sendToImgur=sendToImgur
    vm.deleteImage=deleteImage
    var albumDeletehash = ""
    var albumId = ""
    vm.images= []
    var imgurClient=''
    var ids = []
    vm.loading = true
    vm.gallery = false

    $scope.setContent = adminService.setContent
    $scope.content = adminService.getContent()
    $scope.newContent ={}



// GET Imgur Client Key from the back-end
    $http({
      method:'GET',
      url:'/api/imgurKey'
    }).then(
      function(res){
        imgurClient = res.data.imgurClient
        albumId = res.data.albumId
        albumDeletehash = res.data.albumDeletehash
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
        fileReader.readAsArrayBuffer(vm.imageForm.image);
        fileReader.onload = function(e) {
          $http({
            url: 'upload',
            header: {'Content-Type': vm.imageForm.image.type},
            data: e.target.result
          }).then (function(response) {

          },null, function(evt) {
            vm.progress[index] = parseInt(100.0 * evt.loaded / evt.total)
          });
          console.log('image transformation completed')
        }
//UPLOAD selected image
        console.log('uploading image starting')
        console.log(vm.imageForm)
        var promise = $http({
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          data: vm.imageForm.image,
          headers: {'Authorization': 'Client-ID '+imgurClient}
        }).then(
          function(res) {
            console.log(res)
            ids.push(res.data.data.id)
            console.log("SUCCESS!!! the new image uploaded id is "+ids[0])
            addImageToAlbum ()
          }
        );
      }
    }

//ADD selected image to Album
    function addImageToAlbum () {
      var promise = $http({
        method: 'PUT',
        url: 'https://api.imgur.com/3/album/'+albumDeletehash+'/add',
        data: {'ids': ids},
        headers: {'Authorization': 'Client-ID '+imgurClient}
      });
      promise.then(
        function(res) {
          getAlbumImages()
        }
      )
    }

// GET Album images
    function getAlbumImages () {
      vm.gallery = false;
      vm.loading = true;
      setTimeout(function(){
        $http({
          method: 'GET',
          url: 'https://api.imgur.com/3/album/'+albumId+'/images',
          headers: {'Authorization': 'Client-ID '+imgurClient}
        }).then(
          function (res) {
            vm.images = res.data.data
            console.log(vm.images)
            vm.loading = false
            vm.gallery = true
            setTimeout(function(){
              $('.carousel').carousel()
            },1000)
          }
        )
      },5000)
    };

    function deleteImage (image) {
      var index = vm.images.indexOf(image)
      vm.images.splice(index,1);
      var imagesIds = []
      vm.images.forEach(function(e) {
        imagesIds.push(e.id)
      })
      var promise = $http({
        method: 'PUT',
        url: 'https://api.imgur.com/3/album/'+albumDeletehash,
        headers: {'Authorization': 'Client-ID '+imgurClient},
        data:{'ids': imagesIds}
      }).then (
        function (res) {
        }
      )
    }

  }
})();





