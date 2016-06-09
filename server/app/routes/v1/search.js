'use strict';

var express = require('express');
var router = express.Router();

// Utils
var hasRole = require('../../utils/roleMiddleware');

// Models
var Sessions = require('../../models/sessions');

router.route('/')
  .get(function(req, res) {
    Sessions.search(
  {query_string: {query: 'modev'}},
  {
    hydrate: true
  },
  function(err, results) {
   console.log(results.hits.hits)
});
  });


module.exports = router;
