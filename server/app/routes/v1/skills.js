'use strict';

var express = require('express');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Skills = require('../../models/skills');

router.route('/')
  .post(function(req, res) {
    
  })
  .get(function(req, res) {
    Skills.find({}, function(err, response) {
      res.json(response);
    }).populate('instructor');
  });


router.route('/:id')
  .get(function(req, res) {
    Skills.findOne({
      _id: req.params.id
    })
    .exec(function(err, response) {
      res.json(response);
    });
  })
  .put(function(req, res) {
    
  });

module.exports = router;
