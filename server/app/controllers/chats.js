'use strict';

var Chats = require('../models/Chats');
var Roles = require('../models/roles');
var _ = require('lodash');

var chats = {};

chats.getAll = function(limit, offset) {
  return Chats.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, chats) {
      return chats;
    });
};

chats.getById = function(id) {
  return Chats.findOne({
    _id: id
  })
  .exec(function(err, user) {
    return user;
  });
};

chats.getChatsInConversation = function(conversationId) {
  return Chats.find({
    roomId: conversationId
  })
  .exec(function(err, chats) {
    return chats;
  });
};

chats.updateById = function(id, params) {
  var updatedObj = {};
  var find = {_id: id};

  return Chats.update(find, updatedObj)
    .exec(function(err, updatedObj) {
      if(err) {
        throw err; 
      }else{
        return updatedObj;
      }
    });
};

chats.add = function(params) {
  var chat = new Chats({ 
    roomId: params.roomId,
    log: params.log,
    user: params.user
  });

  return chat.save().then(function() {
    return chat;
  });
};



module.exports = chats;
