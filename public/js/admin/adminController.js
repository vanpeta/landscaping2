(function(){
  'use strict';

  angular
  .module('landscaping')
  .controller('adminController', adminController)

  adminController.$inject=['$http', 'Upload', 'adminService', '$scope', 'authService','imgurService'];

  function adminController($http, Upload, adminService, $scope, authService, imgurService){
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
    var imageDeletehash =''
    vm.loading = true
    vm.gallery = false
    vm.blackBox = false
    vm.enlargeImg = enlargeImg
    vm.closeImg = closeImg
    vm.imageLink = ''
    vm.modalUploadImg = modalUploadImg
    vm.authService = authService;


    $scope.setContent = adminService.setContent
    $scope.content = adminService.getContent()
    $scope.newContent ={}

    function enlargeImg (image) {
      vm.blackBox = true
      vm.imageLink = image.link
    }

    function closeImg () {
      console.log('triggered closeimg')
      vm.blackBox = false
    }

    function modalUploadImg () {
      setTimeout(function(){
        $('.modal-trigger').leanModal();
      },50)
    };


    function showPhotos () {
      vm.gallery = false;
      vm.loading = true;
      imgurService
        .getAlbumImages()
        .then(function(res){
          vm.images=JSON.parse(res.data).data;
          vm.loading = false
          vm.gallery = true
          console.log (vm.images)
        })
    };

    showPhotos ()

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
      console.log(vm.imageForm.image)
      imgurService
        .convertTo64(vm.imageForm.image)
        .then(function(res){
          imgurService
            .uploadImage(res)
            .then(function(res){
              console.log(res)
              var response = res.data.data
              ids.push(response.id)
              imageDeletehash = (response.deletehash)
              console.log("SUCCESS!!! the new image uploaded id is "+response.id)
              updateImage ()
            })
          })
      }

//UPDATE image with title and description
    function updateImage () {
      console.log('updateImage triggered')
      console.log('this is the title: ' + vm.imageForm.title)
      console.log('this is the description: ' + vm.imageForm.description)
      if (vm.imageForm.title || vm.imageForm.description) {
        var promise = $http({
          method: 'PUT',
          url:  '/imgur?imageDeletehash='+imageDeletehash,
          data: { title : vm.imageForm.title,
                  description : vm.imageForm.description}
        });
        promise.then(
          function(res) {
            console.log('image updated')
            console.log (res)
            addImageToAlbum ()
          })
      }
    }
//ADD selected image to Album
    function addImageToAlbum () {
      console.log('addImageToAlbum triggered')
      var promise = $http({
        method: 'PUT',
        url: '/imgur/album',
        data: {'ids': ids},
      });
      promise.then(
        function(res) {
          getAlbumImages.getAlbumImages()
        }
      )
    }



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





