'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Models
var RolesModel = require('./app/models/roles');
var UsersModel = require('./app/models/users');

// MongoDB ==================================================
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/app';
mongoose.connect(mongoUri);

var promisesRoles = [];
var promisesUsers = [];

var rolesId;
var gymsId;

// Clear Collections
RolesModel.remove({}, function() { 
   console.log('Roles Removed');
});

UsersModel.remove({}, function() { 
   console.log('Users Removed');
});


// Add roles
var roles = ['user', 'app-owner'];

roles.forEach(function(item) {
	var toSave = new RolesModel({ name: item });
	promisesRoles.push(toSave.save());
});

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


promisesUsers.push(user.save());
promisesUsers.push(userTwo.save());

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
