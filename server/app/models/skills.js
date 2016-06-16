'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var skills = new Schema({ 
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  rank: {
    type: String,
  }
});

skills.plugin(uniqueValidator);

module.exports = mongoose.model('Skills', skills);