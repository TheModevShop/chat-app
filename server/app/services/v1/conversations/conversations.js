'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Promise = require('bluebird');

// Models
var Conversations = require('../../../controllers/conversations');

module.exports = function(){
  var app = this;

  var conversationService = {
    find: function(params) {
      if (_.get(params.query, 'users')) {
        return Conversations.getByUsersInConversation(params.query.users);
    } else {
        return Conversations.getAll(params.query.limit, params.query.offset);
      }
    },

    get: function(id, params) {
     return Conversations.getById(id)
    },

    update: function(id, data, params) {
      Conversations.updateById(id, data)
    },

    create: function(data, params) {
      return Conversations.add(data);
    }
  }

  // Initialize our service with any options it requires
  app.use('/conversations', conversationService);
  // Get our initialize service to that we can bind hooks
  var messageService = app.service('/conversations');
};
