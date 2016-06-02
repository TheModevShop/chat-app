var express = require("express");
var cloudinary = require('cloudinary');
var BluebirdPromise = require('bluebird');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});
  
function uploadPhoto(photo, name) {
  return new BluebirdPromise(function(resolve, reject) {
    var options = {overwrite: true};

    if (name) {
      options.public_id = name;
    }
    photo = photo.photo || photo
    cloudinary.uploader.upload(photo, function(result) {
      if (result && result.url) {      
        resolve(result.url);
      } else {
        reject(result)
      }
    }, options);
  });
}

module.exports = uploadPhoto;