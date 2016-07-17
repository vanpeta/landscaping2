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
    var imgurClient=''


    $http({
      method: 'GET',
      url: '/api/imgurKey'
    }). then(function (res) {
      imgurClient = res.data
    })

    function sendToImgur () {
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
      }

      var promise = $http({
        method: 'POST',
        url: 'https://api.imgur.com/3/upload',
        data: vm.uploadImageForm,
        headers: {'Authorization': 'Client-ID '+imgurClient}
      });
      promise.then(
        function(res) {
          console.log(res)
          //console.log(JSON.parse(xhr.responseText).upload.links.imgur_page)
          console.log('worked')
          var response = res.data.data.link
          console.log(response)
        }
      )
    }
  }
})();
