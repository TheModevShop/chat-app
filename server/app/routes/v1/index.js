'use strict';

var express = require('express');

var feathers = require('feathers'),
  path = require('path'),
  mongooseService = require('feathers-mongoose'),
  Todo = require('./models/todo');

// Utils
var auth = require('../../utils/auth');
var hasRole = require('../../utils/roleMiddleware');

// Routes
var authenticate = require('./authenticate');
var users = require('./users');
var me = require('./me');
var roles = require('./roles');
var forgot = require('./forgot');
var chats = require('./chats');
var conversations = require('./conversations');



module.exports = function(app){ 
  app.use('/authenticate', authenticate);
  app.use('/me', auth, me);
  app.use('/roles', roles);
  app.use('/forgot', forgot);
  app.use('/users', users); 
  app.use('/conversations', conversations); 
  app.use('/chats', chats); 
};