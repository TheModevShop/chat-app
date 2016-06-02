'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Models
var Users = require('../../models/users');
var Roles = require('../../models/roles');

router.route('/')
  .post(function(req, res) {
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
  });

module.exports = router;
