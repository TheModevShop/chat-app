'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Models
var RolesModel = require('./app/models/roles');
var UsersModel = require('./app/models/users');
var ConversationsModel = require('./app/models/conversations');
var SessionsModel = require('./app/models/sessions');

// MongoDB ==================================================
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/app';
mongoose.connect(mongoUri);

var promisesRoles = [];
var promisesUsers = [];
var promisesConversations = [];

var rolesId;
var gymsId;

// Clear Collections
RolesModel.remove({}, function() { 
   console.log('Roles Removed');
});

UsersModel.remove({}, function() { 
   console.log('Users Removed');
});

ConversationsModel.remove({}, function() { 
   console.log('ConversationsModel Removed');
});


// Add roles
var roles = ['user', 'app-owner'];

roles.forEach(function(item) {
	var toSave = new RolesModel({ name: item });
	promisesRoles.push(toSave.save());
});


// Add Users
var user = new UsersModel({ 
  name: {
    first: 'admin',
    last: 'admin'
  },
  email: 'admin@admin.com' ,
  password: 'admin'
});
var userTwo = new UsersModel({ 
  name: {
    first: 'user',
    last: 'user'
  },
  email: 'user@user.com' ,
  password: 'user'
});


// Add Conversations
var con = new ConversationsModel({ 
  users: [user, userTwo],
  creationDate: Date.now(),
  roomId: 234
});

var session = new SessionsModel({
  name: 'Modev Shop Training',
  image: 'http://images.unsplash.com/photo-1453733190371-0a9bedd82893?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=950&q=80',
  capacity: 1,
  price: 3200,
  notes: 'Focus in Arrays',
  dateAndTime: new Date(),
  date: '060216',
  time: {
    start: '15:00',
    end: '16:00'
  },
  description: 'This is a class about learning javascript with people who understand the space and techology.',
  instructor: user,
  enrolled: [],
  location: {}
})

var sessiontwo = new SessionsModel({
  name: 'App Training',
  image: 'http://images.unsplash.com/photo-1431068799455-80bae0caf685?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=844&q=80',
  capacity: 1,
  price: 3200,
  notes: 'Focus in Arrays',
  dateAndTime: new Date(),
  date: '060216',
  time: {
    start: '09:00',
    end: '16:00'
  },
  description: 'This is a class about learning javascript with people who understand the space and techology.',
  instructor: user,
  enrolled: [],
  location: {}
})

var sessionthree = new SessionsModel({
  name: 'Tech Training',
  image: 'http://images.unsplash.com/photo-1416339442236-8ceb164046f8?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=915&q=80',
  capacity: 1,
  price: 3200,
  notes: 'Focus in Arrays',
  dateAndTime: new Date(),
  date: '060216',
  time: {
    start: '11:00',
    end: '16:00'
  },
  description: 'This is a class about learning javascript with people who understand the space and techology.',
  instructor: user,
  enrolled: [],
  location: {}
})

var sessionfour = new SessionsModel({
  name: 'Modev Shop Training',
  image: 'http://images.unsplash.com/photo-1453733190371-0a9bedd82893?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1266&h=950&q=80',
  capacity: 1,
  price: 3200,
  notes: 'Focus in Arrays',
  dateAndTime: new Date(),
  date: '060216',
  time: {
    start: '12:00',
    end: '13:00'
  },
  description: 'This is a class about learning javascript with people who understand the space and techology.',
  instructor: user,
  enrolled: [],
  location: {}
})


promisesUsers.push(user.save());
promisesUsers.push(userTwo.save());

promisesUsers.push(con.save());
promisesUsers.push(session.save());
promisesUsers.push(sessiontwo.save());
promisesUsers.push(sessionthree.save());
promisesUsers.push(sessionfour.save());

Promise.all(promisesRoles)
	// All roles
	.then(function(values) {
		console.log('Roles');
		console.log(values);
		rolesId = values;
		return Promise.all(promisesUsers);
	})
	// All Users
	.then(function(values) {
		console.log('Users');
		console.log(values);
		console.log('DONE');
		process.exit();
		// return;
	})
	.catch(function(err) {
		console.log("ERROR");
		console.log(err);
		process.exit();
	});
