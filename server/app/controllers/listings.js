'use strict';

var Listings = require('../models/listings');
var Roles = require('../models/roles');
var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var _ = require('lodash');

var listings = {};

listings.getAll = function(limit, offset) {
  return Listings.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, chatrooms) {
      return chatrooms;
    });
};

listings.getById = function(id) {
  return Listings.findOne({
    _id: id
  })
  .populate()
  .exec(function(err, user) {
    return user;
  });
};


listings.updateById = function(id, params) {
  var updatedObj = {};
  var find = {_id: id};

  
  return Listings.update(find, updatedObj)
    .exec(function(err, updatedObj) {
      if(err) {
        throw err; 
      }else{
        return updatedObj;
      }
    });
};


listings.add = function(session) {
  var newSession = new Listings(session);
  return newSession.save()
};



module.exports = listings;
