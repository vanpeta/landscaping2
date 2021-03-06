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
          vm.images.forEach(function(e){
            e.link = e.link.replace('http','https');
          })
          vm.loading = false
          vm.gallery = true
        })
    };

    showPhotos()

    function sendToImgur () {
      var title = null;
      var description = null;
      if (vm.imageForm.title) {
        title = vm.imageForm.title
      }
      if (vm.imageForm.description) {
        description = vm.imageForm.description
      }
      imgurService
        .convertTo64(vm.imageForm.image)
        .then(function(res){
          imgurService
            .uploadImage(res, title, description)
            .then(function(res){
              var response = res.data.data
              ids.push(response.id)
              imageDeletehash = (response.deletehash)
              addImageToAlbum(ids)
            })
          })
      }

//ADD selected image to Album
    function addImageToAlbum () {
      imgurService
        .addImageToAlbum(ids)
        .then(
          showPhotos()
        )
    }

    function deleteImage (image) {
      var index = vm.images.indexOf(image)
      vm.images.splice(index,1);
      var imageDeletehash = image.deletehash
      var ids = [];
      vm.images.forEach(function(e) {
        ids.push(e.id)
      })
      imgurService
        .deleteImage(ids)
        .then(function(res) {
        })
    }

  }
})();





