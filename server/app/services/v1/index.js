'use strict';

// // Utils
// var auth = require('../../utils/auth');
// var hasRole = require('../../utils/roleMiddleware');

// // Routes
// var authenticate = require('./authenticate');
// var users = require('./users');
// var me = require('./me');
// var roles = require('./roles');
// var forgot = require('./forgot');
// var chats = require('./chats');
// var conversations = require('./conversations');
// var app = feathers();


// module.exports = function() { 
//   app.use('/authenticate', authenticate);
//   app.use('/me', auth, me);
//   app.use('/roles', roles);
//   app.use('/forgot', forgot);
//   app.use('/users', users); 
//   app.use('/conversations', conversations);
//   app.use('/chats', chats); 
// };

var conversations = require('./conversations/conversations');
var chats = require('./chats/chats');
var users = require('./users/users');
// var authentication = require('./authentication/authentication');

module.exports = function() {
  var app = this;
  app.configure(conversations);
  app.configure(chats);
  app.configure(users);
  // app.configure(authentication);
};