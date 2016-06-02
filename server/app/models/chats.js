'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var chats = new Schema({ 
  roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'Conversations'},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  log: {
    type: String,
  },
  Date: { 
    type: Date, 
    default: Date.now 
  },
});

chats.plugin(uniqueValidator);

module.exports = mongoose.model('Chats', chats);