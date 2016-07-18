'use strict';
var BluebirdPromise = require('bluebird');

var Users = require('../models/users');
var Roles = require('../models/roles');
var Sessions = require('../models/sessions');

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


users.addSession = function(user, sessionId) {
  return new BluebirdPromise(function(resolve, reject) {
    Sessions.findOne({
      _id: sessionId
    })
    .then(function(session) {
      if (session.enrolled.length >= session.capacity) {
        reject({error: 'Session Full'});
      } 
      Sessions.findByIdAndUpdate({_id: session._id}, { $addToSet: { enrolled: user._id } })
      .exec(function (err) {
        if(err) {
          reject(err); 
        } else {
          resolve({ 'userId': user._id, 'sessionId': sessionId });
        }
      });
      
    })
    .catch(function(err) {
      reject(err);
    });
  });
};



users.getBookedInstructorSessions = function(obj) {
  var startDate = obj.start;
  var endDate = obj.end;
  var id = obj.id;
  var limit = obj.limit;
  var offset = obj.offset;
  var showCancelled = obj.showCancelled;

  return Sessions.find({
    complete: { $exists: false },
    removed: { $exists: false },
    dismissed: {
      $nin: [id]
    },
    $and : [
      {$or: [ 
        { cancelled: { $exists: false } }, 
        {$and: [ 
          { date: { $gte: startDate } }, 
          { cancelled: { $exists: !!showCancelled } } // mark as true if you want to see cancelled
        ]} 
      ]},
      {$or: [ 
        { instructor: id }, 
        { enrolled: { $in: [id] } } 
      ]}
    ],
    $or: [ 
      { $where: "this.enrolled.length > 0"}, 
      { private: { $ne: true } } 
    ],
    date: {
      $lte: endDate
    }
  })
  .populate('instructor')
  .populate('location')
  .populate('enrolled')
  .limit(limit || 100)
  .skip(offset || 0)
  .sort({date: 1, "dateAndTime" : 1})
  .exec(function(err, sessions) {
    return sessions;
  });
};


users.getSessions = function(obj) {
  var startDate = obj.start;
  var endDate = obj.end;
  var id = obj.id;
  var limit = obj.limit;
  var offset = obj.offset;
  var notComplete = obj.notComplete;
  var query = {
    enrolled: {
      $in: [id]
    },
    dismissed: {
      $nin: [id]
    },
    removed: { $exists: false }
  };

  if (startDate && endDate) {
    query.date = {
      $gte: startDate,
      $lte: endDate
    }
  }

  if (notComplete) {
    query.complete = { $exists: false };
  } 

  console.log(query)

  return Sessions.find(query)
    .populate('listing')
    .limit(limit || 100)
    .skip(offset || 0)
    .sort({"dateAndTime" : 1})
    .exec(function(err, sessions) {
      return sessions;
    });
};



users.getPaymentMethod = function(id) {
  var query = 'paymentMethod name';
  return Users.findOne({ _id: id }, query)
    .populate('paymentMethod')
    .exec(function(err, paymentMethod) {
      return paymentMethod;
    });
};



module.exports = users;
