'use strict';

var express = require('express');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Sessions = require('../../models/sessions');

router.route('/')
  .post(function(req, res) {
    
  })
  .get(function(req, res) {
    Sessions.find({}, function(err, response) {
      res.json(response);
    }).populate('listing');
  });


router.route('/:id')
  .get(function(req, res) {
    Sessions.findOne({
      _id: req.params.id
    })
    .populate('listing')
    .exec(function(err, response) {
      res.json(response);
    });
  })
  .put(function(req, res) {
    
  });

module.exports = router;
