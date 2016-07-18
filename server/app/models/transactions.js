'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var transactions = new Schema({
  date: {
    type: Date,
    required: true
  },
  stripe: {
    type: Object,
    required: true
  },
  amountAfterProcessor: {
    type: Number,
    required: true
  },
  amountAfterProcessorAndApp: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  refunded: {
    type: Object
  },
  session: {
    required: true,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Sessions' 
  },
  userCharged: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Listings',
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users'
  },
  failed: {
    type: Object
  },
  type: {
    type: String
  },
  status: {
    type: String
  } 
});

transactions.plugin(uniqueValidator);
transactions.plugin(deepPopulate);

module.exports = mongoose.model('Transactions', transactions);