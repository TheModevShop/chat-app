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

sessions.getSessions = function(query) {
  query = query || {}
  var  queryObject = {};
  if (query.endDate && query.startDate) {
    queryObject.date = {
      $gte: query.startDate,
      $lte: query.endDate
    }
  }
  return Sessions.find(_.pickBy(queryObject, _.identity))
    .limit(query.limit || 10)
    .skip(query.offset || 0)
    .deepPopulate('listing.instructor listing.skill')
    .exec(function(err, sessions) {
      return sessions;
    });
};


sessions.getAvailability = function(query) {
  var queryObj = {};
  if (query.skillId) {
    queryObj["listing.skill"] = query.skillId;
  }
  if (query.listingId) {
    queryObj.listing = query.listingId;
  }
  return Sessions.find(queryObj)
  .distinct('date')
  .exec(function(err, sessions) {
    return sessions;
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
