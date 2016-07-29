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
    var albumDeletehash = "8dTjIP45GplZuc0"
    var albumId = "fKeE0"
    vm.images= []
    var imgurClient=''
    var ids = []
    vm.loading = true
    vm.gallery = false
    vm.numberToEnglish=numberToEnglish

    $scope.setContent = adminService.setContent
    $scope.content = adminService.getContent()
    $scope.newContent ={}



// GET Imgur Client Key from the back-end
    $http({
      method:'GET',
      url:'/api/imgurKey'
    }).then(
      function(res){
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

    function numberToEnglish(image) {
      var n=(vm.images.indexOf(image)+1)
      var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words, and = 'and';
/* Is number zero? */
      if( parseInt( string ) === 0 ) {
        return 'zero';
      }
/* Array of units as words */
      units = [ '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ];
/* Array of tens as words */
      tens = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety' ];
/* Array of scales as words */
      scales = [ '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];
/* Split user arguemnt into 3 digit chunks from right to left */
      start = string.length;
      chunks = [];
      while( start > 0 ) {
        end = start;
        chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
      }
/* Check if function has enough scale words to be able to stringify the user argument */
      chunksLen = chunks.length;
      if( chunksLen > scales.length ) {
        return '';
      }
/* Stringify each integer in each chunk */
      words = [];
      for( i = 0; i < chunksLen; i++ ) {
        chunk = parseInt( chunks[i] );
        if( chunk ) {
/* Split chunk into array of individual integers */
          ints = chunks[i].split( '' ).reverse().map( parseFloat );
/* If tens integer is 1, i.e. 10, then add 10 to units integer */
          if( ints[1] === 1 ) {
            ints[0] += 10;
            }
/* Add scale word if chunk is not zero and array item exists */
          if( ( word = scales[i] ) ) {
                words.push( word );
            }
/* Add unit word if array item exists */
          if( ( word = units[ ints[0] ] ) ) {
                words.push( word );
          }
/* Add tens word if array item exists */
          if( ( word = tens[ ints[1] ] ) ) {
                words.push( word );
          }
            /* Add 'and' string after units or tens integer if: */
            // if( ints[0] || ints[1] ) {

            //      Chunk has a hundreds integer or chunk is the first of multiple chunks
            //     if( ints[2] || ! i && chunksLen ) {
            //         words.push( and );
            //     }

            // }

/* Add hundreds word if array item exists */
          if( ( word = units[ ints[2] ] ) ) {
                words.push( word + ' hundred' );
          }
        }
      }
      return words.reverse().join( ' ' );
    }


  }
})();





