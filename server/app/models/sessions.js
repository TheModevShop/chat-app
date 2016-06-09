'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var DateOnly = require('mongoose-dateonly')(mongoose);
var mongoosastic = require('mongoosastic');


var Schema = mongoose.Schema;

var sessions = new Schema({
  name: {
    type: String,
    es_indexed:true
  },
  complete: {
    type: Boolean
  },
  image: {
    type: String,
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
  description: {
    type: String,
    es_indexed:true
  },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SessionCategories' }],
  enrolled: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Users'
    }
  ],
  location: {
    type: {}
  }
});


sessions.plugin(mongoosastic)
sessions.plugin(uniqueValidator);
sessions.plugin(deepPopulate);
sessions.index( { 'instructor' : 1,  'date' : 1, 'time' : 1, 'cancelled' : 1, 'removed': 1 }, { 'unique' : true } )

sessions.pre('update', function(doc) {
  // check capacity
});

module.exports = mongoose.model('Sessions', sessions);