'use strict';

var express = require('express');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Listings = require('../../models/listings');

// Controllers
var SessionsController = require('../../controllers/sessions');

router.route('/')
  .post(function(req, res) {
    
  })
  .get(function(req, res) {
    Listings.find({}, function(err, response) {
      res.json(response);
    }).populate('instructor');
  });


router.route('/:id')
  .get(function(req, res) {
    Listings.findOne({
      _id: req.params.id
    })
    .populate('instructor')
    .exec(function(err, response) {
      res.json(response);
    });
  })
  .put(function(req, res) {
    
  });


router.route('/:id/sessions')
  .get(function(req, res) {
    SessionsController.getSessionsForListing(req.params.id)
    .then(function(sessions) {
      res.json(sessions);
    })
  })

module.exports = router;
