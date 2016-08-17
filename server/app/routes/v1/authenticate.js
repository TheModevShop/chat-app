'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Models
var Users = require('../../models/users');
var Roles = require('../../models/roles');
var request = require('request');

// facebookLogin({
//   body: {
//     userId: '10156935670120527', 
//     token: 'EAAHMhLp4MZA0BAGrmRhZBYnEOjzONMJQUuKTAJnNzI8S8SiTy5wZBZBzUhKLv579RqcsjbUhQ0EoxYRpz3ibwu0How6ViHu3JGCjStv1Yo9kOvQH0ZCCMLotfZAaRG4ZAVSmZADqheuWlofHTUrNxmTO7Xwa3r2oXdZBObogrpACff4kPLeeJO95UMlyONL2b0F4ZD'
//   }
// })

router.route('/')
  .post(function(req, res) { 
    if (req.body.token) {
      facebookLogin(req, res);
    } else {
      Users.findOne({
      email: req.body.email
      }, '+password')
      .exec(function(err, user) {
        if (err) throw err; // Change to send error

        if (!user) {
          res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
          user.verifyPassword(req.body.password, function(err, isMatch) {
            if(err || !isMatch) {
              res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
            }else{
              var token = jwt.sign({ _id: user._id, user: user }, req.app.get('superSecret'), {
                expiresIn: 2592000 // expires in 24 hours
              });

              res.json({
                token: token
              });
            }
          });
        }
      });
    }
  });

  function facebookLogin(req, res) {
    Users.findOne({
      'facebookCredentials.userId': req.body.userId
    })
    .exec(function(err, user) {
      if (err) throw err; // Change to send error
      if (!user) {

        // res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        request('https://graph.facebook.com/me?fields=email,name&access_token='+req.body.token, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var token = jwt.sign({ _id: user._id, user: user }, req.app.get('superSecret'), {
              expiresIn: 2592000 // expires in 24 hours
            });
            res.json({token: token});
          } else {
            res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
          }
        });
   
      }
    });

  }

  function getFacebookUser(token) {
    request('https://graph.facebook.com/me?fields=email,name&access_token='+req.body.token, function (error, response, body) {
      if (!error && response.statusCode == 200) {
       
      } else {
       
      }
    });
  }

module.exports = router;
