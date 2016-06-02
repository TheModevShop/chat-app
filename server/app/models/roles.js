'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var roles = new Schema({
	name: {
		type: String,
  	required: true,
  	unique: true,
  	default: 'user'
	}
});

roles.plugin(uniqueValidator);

module.exports = mongoose.model('Roles', roles);