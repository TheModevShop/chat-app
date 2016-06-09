'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var sessionCategories = new Schema({ 
  name: {
    type: String,
    unique: true
  },
  description: { 
    type: Date, 
    default: Date.now 
  }
});

sessionCategories.plugin(uniqueValidator);

module.exports = mongoose.model('SessionCategories', sessionCategories);