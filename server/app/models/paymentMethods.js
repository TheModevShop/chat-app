'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var paymentMethods = new Schema({ 
  card: {
    type: Object,
    required: true
  },
  processor_id: {
    type: String,
    required: true
  },
  processor: {
    type: String,
    required: true
  },
  customer: {
    type: String
  }
});


paymentMethods.plugin(uniqueValidator);
module.exports = mongoose.model('PaymentMethods', paymentMethods);