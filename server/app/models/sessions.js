'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var DateOnly = require('mongoose-dateonly')(mongoose);
var mongoosastic = require('mongoosastic');


var Schema = mongoose.Schema;

var sessions = new Schema({
  complete: {
    type: Boolean
  },
  cancelled: {
    type: Date
  },
  removed: {
    type: Date,
  },
  dismissed: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    default: []
  },
  capacity: {
    type: Number,
    default: 1
  },
  price: Number,
  notes: String,
  dateAndTime: {
    type: Date,
  },
  date: {
    type: String,
  },
  time: {
    start: {
      type: String,
    },
    end: {
      type: String,
    }
  },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listings' },
  enrolled: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Users'
    }
  ],
});


sessions.plugin(mongoosastic)
sessions.plugin(uniqueValidator);
sessions.plugin(deepPopulate);
sessions.index( { 'listing' : 1,  'date' : 1, 'time' : 1, 'cancelled' : 1, 'removed': 1 }, { 'unique' : true } )

sessions.pre('update', function(doc) {
  // check capacity
});

module.exports = mongoose.model('Sessions', sessions);