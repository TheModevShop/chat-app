'use strict';

var express = require('express');
var _ = require('lodash');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Sessions = require('../../models/sessions');

router.route('/')
  .get(function(req, res) {
    Sessions.search(
  {query_string: {query: req.query.query}},
  {
    hydrate: true
  },
  function(err, results) {
    res.json(_.get(results, 'hits.hits', []));
});
  });


module.exports = router;
