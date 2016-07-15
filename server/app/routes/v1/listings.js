'use strict';

var express = require('express');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Listings = require('../../models/listings');

// Controllers
var SessionsController = require('../../controllers/sessions');
var ListingsController = require('../../controllers/listings');

router.route('/')
  .post(function(req, res) {
    
  })
  .get(function(req, res) {
    ListingsController.getListings(req.query)
    .then(function(listings) {
      res.json(listings);
    })
  });

router.route('/popular')
  .get(function(req, res) {
    ListingsController.getListings(req.query)
    .then(function(listings) {
      res.json(listings);
    })
  });

router.route('/:id')
  .get(function(req, res) {
    if (req.params.id === 'popular') {

    }
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
