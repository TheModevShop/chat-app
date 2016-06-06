// 'use strict';

// var express = require('express');
// var router = express.Router();
// var _ = require('lodash');
// var Promise = require('bluebird');

// var express = require('express');
// var router = express.Router();
// var jwt = require('jsonwebtoken');

// // Models
// var Users = require('../../../models/users');
// var Roles = require('../../../models/roles');


// module.exports = function(){
//   var app = this;

//   var authenticationService = {
//     create: function(data, params) {
//       return Users.findOne({
//         email: data.email
//       }, '+password')
//       .exec(function(err, user) {
//         if (err) throw err; // Change to send error

//         if (!user) {
//           // res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
//           console.log('error')
//         } else if (user) {
//           user.verifyPassword(data.password, function(err, isMatch) {
//             if(err || !isMatch) {
//               console.log('errror')
//             }else{
//               var token = jwt.sign({ _id: user._id, user: user }, app.get('superSecret'), {
//                 expiresIn: 2592000 // expires in 24 hour
//               });

//               return {
//                 token: token
//               };
//             }
//           });
//         }
//       });
//     }
//   }

//   // Initialize our service with any options it requires
//   app.use('/authenticate', authenticationService);
  
// };
