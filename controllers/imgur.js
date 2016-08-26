require('dotenv').load();
var fs = require('fs')
var https = require('https');
var rp = require('request-promise');

module.exports = {
  getImages: getImages,
  uploadImage: uploadImage,
  addImageToAlbum: addImageToAlbum,
  deleteImage: deleteImage
}

function getImages (req,res,next) {
    rp({
    url: 'https://api.imgur.com/3/album/'+process.env.albumId+'/images',
    headers: {
      'Authorization': 'Client-ID '+process.env.IMGUR_Client_ID
    },
  })
  .then(function(getImagesRes) {
    res.json(getImagesRes);
  })
  .catch(console.error);
};

function uploadImage (req,res,next) {
  console.log(req.body)
  rp({
    method: 'POST',
    url: 'https://api.imgur.com/3/image',
    headers: {
      'Authorization': 'Client-ID '+process.env.IMGUR_Client_ID
    },
    body: req.body,
    json: true
  })
  .then(function(uploadImageRes){
    res.json(uploadImageRes);
  })
  .catch(function (error){
    throw(error)
  })
};

function addImageToAlbum (req,res,next) {
  rp({
    method: 'PUT',
    url: 'https://api.imgur.com/3/album/'+process.env.albumDeletehash+'/add',
    headers: {
      'Authorization': 'Client-ID '+process.env.IMGUR_Client_ID
    },
    body: req.body,
    json: true

  })
  .then(function(addImageToAlbumRes){
    res.json(addImageToAlbumRes)
  })
  .catch(console.error);
};

function deleteImage (req,res,next) {
  console.log(req.query.ids)
  rp({
    method: 'PUT',
    url: 'https://api.imgur.com/3/album/'+process.env.albumDeletehash,
    headers: {
      'Authorization': 'Client-ID '+process.env.IMGUR_Client_ID
    },
    body: {ids: req.query.ids},
    json: true
  })
  .then(function(deleteImageRes) {
    res.json(deleteImageRes)
  })
  .catch(console.error)
};








