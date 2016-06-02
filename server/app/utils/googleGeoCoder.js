var geocoder = require('google-geocoder');
var BluebirdPromise = require('bluebird');
var _ = require('lodash');

var geo = geocoder({
  key: process.env.GEOCODER_KEY
});

function getGymGeoPoints(zip) {
  return new BluebirdPromise(function(resolve, reject) {
    geo.find(zip, function(err, res) { 
      if (err) {
        reject(err);
      } else {
        resolve(_.get(res, '[0].location'));
      } 
    });
  });
}

module.exports = getGymGeoPoints;


