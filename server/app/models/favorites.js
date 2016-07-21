'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var favorites = new Schema({ 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listings' }
});

favorites.plugin(uniqueValidator);
favorites.index({ 'listing' : 1, 'user': 1 }, { 'unique' : true } );

module.exports = mongoose.model('Favorites', favorites);