'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

// Models
var Chats = require('../../../controllers/chats');

module.exports = function(){
  var app = this;

  var chatService = {
    find: function(params) {
      if (_.get(params.query, 'users')) {
        return Chats.getByUsersInConversation(params.query.users);
    } else {
        return Chats.getAll(params.query.limit, params.query.offset);
      }
    },

    get: function(id, params) {
     return Chats.getById(id);
    },

    update: function(id, data, params) {
      return Chats.updateById(id, data)
    },

    create: function(data, params) {
      return Chats.add(data);
    }
  }

  // Initialize our service with any options it requires
  app.use('/chats', chatService);

  // Get our initialize service to that we can bind hooks
  var chatServiceRef = app.service('/chats');
};
