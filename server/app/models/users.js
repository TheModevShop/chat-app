'use strict';

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var users = new Schema({ 
  name: {
    first: {
    	type: String,
    },
    last: {
      type: String,
    }
  },
  email: {
  	type: String,

  	unique: true
  },
  bio: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
  	type: String,
    select: false
  },
  image: String,
  dateAdded: {
    type: Date,
  },
  paymentMethod: {type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethods'},
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  deleted: {
    type: Date,
  }
});

users.virtual('name.full').get(function () {
  return this.name.first + ' ' + this.name.last;
});

users.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

users.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      cb(err);
    }else{
      cb(null, isMatch);
    }
  });
};

users.plugin(uniqueValidator);

module.exports = mongoose.model('Users', users);