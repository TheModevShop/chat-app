'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var sessionTags = new Schema({ 
  name: {
    type: String,
    unique: true
  },
  description: { 
    type: Date, 
    default: Date.now 
  }
});

sessionTags.plugin(uniqueValidator);

module.exports = mongoose.model('SessionTags', sessionTags);