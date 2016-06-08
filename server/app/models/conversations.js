'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var conversations = new Schema({ 
  users: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Users'}
  ],
  roomId: {
    type: String
  },
  creationDate: { 
    type: Date, 
    default: Date.now 
  },
  lastMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Chats'},
  deleted: {
    type: Date,
  }
});

conversations.plugin(uniqueValidator);

module.exports = mongoose.model('Conversations', conversations);