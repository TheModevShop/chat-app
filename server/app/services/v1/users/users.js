'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

// Models
var Users = require('../../../controllers/users');
var authHooks = require('feathers-authentication').hooks;

module.exports = function(){
  var app = this;

  var userService = {
    find: function(params) {
     return Users.getAll(params.query.limit, params.query.offset);
    },

    get: function(id, params) {
     return Users.getById(id);
    },

    update: function(id, data, params) {
      return Users.updateById(id, data)
    },

    create: function(data, params) {
      return Users.add(data);
    }
  }

  // Initialize our service with any options it requires
  app.use('/users', userService);

  // Get our initialize service to that we can bind hooks
  var userServiceRef = app.service('/users');
  userServiceRef.before({
    create: [authHooks.hashPassword('password')]
  });

};
