'use strict';

var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var BluebirdPromise = require('bluebird');

var Users = require('../../models/users');
var mailer = require('../../utils/mailer');

router.route('/')
  .post(function(req, res) {
    // Accepts req.body.email
    var token;

    new BluebirdPromise(function(resolve, reject) {
      // Create random token
      crypto.randomBytes(20, function(err, buf) {
        token = buf.toString('hex');

        if (err) {
          reject(err);
        }

        resolve(token);
      });
    })
    .then(function(token) {
      // Lookup user by email
      return Users.findOne({ email: req.body.email });
    })
    .then(function(user) {
      if (!user) {
        throw {err: 'No user found'};
      }

      // Set token and expire
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      return user.save(function(err) {
        if (err) {
          throw { err: err };
        }
        return user;
      });
    })
    .then(function(user) {
      // Send email
      return mailer(
        user.email,
        'Tang Password Reset',
        'You are receiving this because you have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://api.thetangapp.com/v1/forgot/' + user.resetPasswordToken + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n');
    })
    .catch(function(err) {
      res.status(422).json(err);
    })
    .then(function(body) {
      res.json({success: 'Email successfully sent'});
    });
  })
  .get(function(req, res) {
    res.render('forgot');
  });

router.route('/:token')
  .post(function(req, res) {
    // Reset a password
    Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.json({'error': 'Password reset token is invalid or has expired.'});
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save(function(err) {
        // Fwd to default forgot page
        var message;

        if (err) {
          message = { success: 'Password successfully reset' };
        } else {
          message = { error: 'Password not reset'};
        }

        res.redirect('/forgot', message);
      });
    });
  })
  .get(function(req, res) {
    // Display new password prompt or error
    Users.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        res.render('forgot', {
          error: 'Token has expired'
        });
      }

      res.render('reset', {
        user: req.user
      });
    });
  });

module.exports = router;