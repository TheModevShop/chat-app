'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Utils
var auth = require('../../utils/auth');

// Models
var Roles = require('../../models/roles');
var Users = require('../../controllers/users');

router.route('/')
  .post(function(req, res) {
    Users.add(req.body, function(userAdded) {
      if (userAdded.error) {
        res.status(422)
      }
      res.json(userAdded);
    });
  })
  .get(function(req, res) {
    Users.getAll(req.query.limit, req.query.offset)
      .then(function(users) {
        res.json(users);
      })
  });

router.route('/:id')
  .get(function(req, res) {
    Users.getById(req.params.id)
      .then(function(user) {
        res.json(user);
      });
  })
  .put(function(req, res) {
    Users.updateById(req.params.id, req.body)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });


module.exports = router;
