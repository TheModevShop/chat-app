'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var reviews = new Schema({ 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listings' },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  }
});

reviews.plugin(uniqueValidator);
module.exports = mongoose.model('Reviews', reviews);