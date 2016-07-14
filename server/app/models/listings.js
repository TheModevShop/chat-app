'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var listings = new Schema({ 
  name: {
    type: String,
    es_indexed:true
  },
  listed: {
    type: Boolean,
    default: true
  },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skills' },
  image: {
    type: String,
  },
  capacity: {
    type: Number,
    default: 1
  },
  duration: {
    type: Number,
    default: 60
  },
  price: Number,
  description: {
    type: String,
    es_indexed:true
  },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionTags' }],
  location: {
    type: {}
  }
});

listings.plugin(uniqueValidator);

module.exports = mongoose.model('Listings', listings);