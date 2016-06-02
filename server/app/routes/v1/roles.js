'use strict';

var express = require('express');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Roles = require('../../models/roles');

router.route('/')
  .post(hasRole('app-owner'), function(req, res) {
    var params = req.body;

    var role = new Roles({ 
      name: params.name
    });

    role.save(function(err) {
      if (err) {
        res.status(422).json({ 'Error': 'Role already exists'});
      }else{
        res.json({ name: params.name });
      }
    });
  })
  .get(function(req, res) {
    Roles.find({
      name: {$ne: 'app-owner'}
    }, function(err, roles) {
      res.json(roles);
    });
  });

module.exports = router;
