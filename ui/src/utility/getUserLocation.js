const Promise = require('bluebird');
import {addEvent} from 'utility/ga.js';
const errors = {
  1: 'Permission denied',
  2: 'Position unavailable',
  3: 'Request timeout',
  4: 'Geolocator Not Supported'
};
let attempts = 1;
let defaultLat = 39.985079;
let defaultLong = -83.03759589999999;
let defaultFormat = 'Columbus, OH';
let latitude
let longitude;

export function geoCode() {
  return new Promise((resolve, reject) => {
    attempts = 0;
    localStorage.setItem('location', [defaultLat, defaultLong]);
    var fallbackCoords = {
      'latitude': defaultLat,
      'longitude': defaultLong
    };


    setTimeout(function() {
      resolve({lat: defaultLat, lng: defaultLong, error: true});
    }.bind(this), 15000);

    var html5Options = {timeout: 9000};
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGeoSuccess.bind(this), onGeoError.bind(this), html5Options);
    } else {
      var error = {code: 4};
      onBakcupGeoError.call(this, error);
    }


    function onGeoSuccess(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      addEvent('Location Success', latitude.toString() +' '+ longitude.toString());
      localStorage.setItem('location', [latitude.toString(), longitude.toString() ]);
      localStorage.setItem('myLocation', [latitude.toString(), longitude.toString() ]);
      console.log('geo loction found');
      attempts = 0;
      resolve({lat: latitude, lng: longitude});
    }

    function onGeoError(error) {
      console.log(error)
      if (errors[error.code] === 'Permission denied') {
        onBakcupGeoError.call(this, error);
        return;
      }
      console.log(attempts)
      if (false) { // attempts <= 1
        console.log('second attempt to get location');    
        navigator.geolocation.getCurrentPosition(onGeoSuccess.bind(this), onBakcupGeoError.bind(this), html5Options);
      } else {
        onBakcupGeoError.call(this, error);
      }

      attempts++;
    }


    function onBakcupGeoError(error) {
      addEvent('Location Error', errors[error.code]);
      localStorage.setItem('location', [defaultLat, defaultLong]);
      localStorage.setItem('myLocation', [defaultLat, defaultLong]);

      var denied = errors[error.code] === 'Permission denied' ? 'denied' : errors[error.code];
      attempts = 0;
      // alert("Error Getting Location: "+errors[error.code]+", Please manually change location. Default: Columbus");
      reject({lat: defaultLat, lng: defaultLong, denied}); // Backwards to trigger no locations
    }

  });
}

export function changeCity(lat, lng, input) {
  return new Promise((resolve, reject) => {
    if (google && google.maps) {
      var geocoder = new google.maps.Geocoder();
        var locationAddress = lat ? lat+' '+lng : input;
        geocoder.geocode( { 'address': locationAddress}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            var longitude = location[Object.keys(location)[1]];
            var latitude = location[Object.keys(location)[0]];
            var resultFormatting = iterateThroughReverseGeoCode(results);
            localStorage.setItem('location', [longitude, latitude]);
            resolve({lat: _.isFunction(latitude) ? latitude() : latitude, lng: _.isFunction(longitude) ? longitude() : longitude, format: resultFormatting});
          } else {
            reject({lat: defaultLat, lng: defaultLong, format: defaultFormat});

          }
      }.bind(this));
    } else {
      reject({lat: defaultLat, lng: defaultLong, format: defaultFormat});
    }
  });
}



export function iterateThroughReverseGeoCode(array) {
  var city,
      state,
      string;
    _.forEach(array[0].address_components, function (address_component, i) {
   
      if (address_component.types[0] === "locality"){
          console.log("town:"+address_component.long_name);
          city = address_component.long_name;
      }
      if (address_component.types[0] === "administrative_area_level_1"){
          console.log("state:"+address_component.long_name);
          state = address_component.long_name;
      }

      string = city && state ? city +', '+ state : state ? state : 'Location Unknown';
   });
  return string;
}



export function getAddressDetails(address) {
  return new Promise((resolve, reject) => {
    if (google && google.maps) {
      var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var object = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              address: iterateThroughReverseGeoCode(results)
            };
            console.log(object);
            resolve(object);
          } else {
            reject({lat: defaultLat, lng: defaultLong, format: defaultFormat});
          }
      }.bind(this));
    } else {
      reject({lat: defaultLat, lng: defaultLong, format: defaultFormat});
    }
  });
}