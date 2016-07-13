'use strict';

var Sessions = require('../models/sessions');
var Roles = require('../models/roles');
var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var _ = require('lodash');

var sessions = {};

sessions.getAll = function(limit, offset) {
  return Sessions.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, chatrooms) {
      return chatrooms;
    });
};

sessions.getById = function(id) {
  return Sessions.findOne({
    _id: id
  })
  .populate()
  .exec(function(err, user) {
    return user;
  });
};


sessions.getSessionsForUser = function(id) {
 return Sessions.find({
    users: {$in: [id]}
  }).populate('lastMessage users')
};

sessions.updateById = function(id, params) {
  var updatedObj = {};
  var find = {_id: id};

  return Sessions.update(find, updatedObj)
  .exec(function(err, updatedObj) {
    if(err) {
      throw err; 
    }else{
      return updatedObj;
    }
  });
};

sessions.add = function(session) {
  var newSession = new Sessions(session);
  console.log(newSession)
  return newSession.save()
};


sessions.getSessionsForListing = function(id) {
 return Sessions.find({
    listing: id
  }).populate('listing')
};



module.exports = sessions;
