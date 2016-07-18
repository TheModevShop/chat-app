'use strict';

var Favorites = require('../models/favorites');
var Roles = require('../models/roles');
var Sessions = require('../models/sessions');
var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('lodash');

var favorites = {};

favorites.getAll = function(queryObject) {
  return Favorites.find({user: queryObject.user})
    .limit(queryObject.limit || 10)
    .skip(queryObject.offset || 0)
    .populate('listing')
    .exec(function(err, favorites) {
      return favorites;
    });
};

favorites.add = function(params) {
  var favorite = new Favorites({ 
    listing: params.listing,
    user: params.user
  });

  return favorite.save(function(err) {
    if (err) {
      throw { 'Error': 'Favorite already exists'};
    }else{
      return favorite;
    }
  });
};


module.exports = favorites;
