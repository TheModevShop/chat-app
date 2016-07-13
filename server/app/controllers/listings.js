'use strict';

var Listings = require('../models/listings');
var Roles = require('../models/roles');
var Sessions = require('../models/sessions');
var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('lodash');

var listings = {};

listings.getAll = function(limit, offset) {
  return Listings.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, listings) {
      return listings;
    });
};

listings.getForListingsForInstructor = function(id, limit, offset) {
  return Listings.find({
    instructor: id
  })
  .limit(limit || 10)
  .skip(offset || 0)
  .exec(function(err, listings) {
    return listings;
  });
};

listings.getById = function(id) {
  return Listings.findOne({
    _id: id
  })
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
  var newListing = new Listings(session);
  return newListing.save()
};

listings.addSessionsForListing = function(listingId, times) {
  return listings.getById(listingId)
  .then(function(listing) {
    var addedSessions = _.map(times, function(time) {
      return createSession({
        times: time,
        listing: listing
      })
    });
    console.log(addedSessions)
    return Sessions.create(addedSessions, function (err, addedSession) {
      if (err) { throw err }
      return addedSession;
    });
  })
  .catch(function() {
    throw new Error({error: 'listing not found', code: 404})
  })
};


function createSession(obj) {
  listing = listing || {};
  var times = _.get(obj, 'times', {})
  var listing = _.get(obj, 'listing', {})
  
  return new Sessions({
    notes: '',
    dateAndTime: times.dateAndTime,
    date:  times.date,
    time: {
    start: times.time,
    end: moment(times.time, 'H:mm').add(listing.duration || 30, 'minutes').format('H:mm')
    },      
    enrolled: [],
    listing: listing._id
  });
}




module.exports = listings;
