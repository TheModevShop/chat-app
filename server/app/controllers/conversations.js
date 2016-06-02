'use strict';

var Conversations = require('../models/conversations');
var Roles = require('../models/roles');
var BluebirdPromise = require('bluebird');
var uuid = require('node-uuid');
var mongoose = require('mongoose');
var _ = require('lodash');

var rooms = {};

rooms.getAll = function(limit, offset) {
  return Conversations.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, chatrooms) {
      return chatrooms;
    });
};

rooms.getById = function(id) {
  return Conversations.findOne({
    _id: id
  })
  .exec(function(err, user) {
    return user;
  });
};

rooms.getByUsersInConversation = function(ids) {
  return new BluebirdPromise(function(resolve, reject) {
    ids = JSON.parse(ids);
    ids = _.map(ids, function(id) {
      return mongoose.Types.ObjectId(id)
    })
    Conversations.findOne({
      users: ids
    })
    .then(function(user) {
      if (!user) {
        return rooms.add({
          userOne: ids[0],
          userTwo: ids[1]
        })
      }
      else {
        resolve(user)
      }
    })
    .then(function(conversation) {
      resolve(conversation)
    })
    .catch(function(err) {
      reject(err)
    })
  })
};

rooms.updateById = function(id, params) {
  var updatedObj = {};
  var find = {_id: id};

  return Conversations.update(find, updatedObj)
    .exec(function(err, updatedObj) {
      if(err) {
        throw err; 
      }else{
        return updatedObj;
      }
    });
};

rooms.add = function(params) {
  var conversation = new Conversations({ 
    users: [params.userOne, params.userTwo],
    roomId: params.roomId
  });

  return conversation.save()
};



module.exports = rooms;
