'use strict';

var Users = require('../models/users');
var Roles = require('../models/roles');

var users = {};

users.getAll = function(limit, offset) {
  return Users.find({})
    .limit(limit || 10)
    .skip(offset || 0)
    .exec(function(err, users) {
      return users;
    });
};

users.getById = function(id) {
  return Users.findOne({
    _id: id
  })
  .populate('gyms')
  .exec(function(err, user) {
    return user;
  });
};

users.updateById = function(id, params) {
  try {    
    var parse = JSON.parse(params.data);
    params = parse;
  } catch(err) {
    console.log(err)
  }

  var updatedObj = {};
  var find = {_id: id};

  if (params.facebookCredentials) {
    updatedObj.facebookCredentials = params.facebookCredentials;
  }

  console.log(updatedObj)
  
  return Users.update(
    find, updatedObj)
    .exec(function(err, updatedObj) {      
      if(err) {
        throw err; 
      }else{
        return updatedObj;
      }
    });
};

users.add = function(params) {
  var user = new Users({ 
    name: {
      first: params.first,
      last: params.last
    },
    email: params.email,
    password: params.password,
    gyms: [{
      gym: params.gyms
    }]
  });

  return user.save(function(err) {
    if (err) {
      throw { 'Error': 'User already exists'};
    }else{
      return { name: params.name, email: params.email };
    }
  });
};



module.exports = users;
