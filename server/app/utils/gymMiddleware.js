'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// -- How to use
// var hasGym = require('gymMiddleware');
// router.use('/mytestroute', hasGym(), mytestroute);

function hasGym() {
  return function(req, res, next) {

    var test = _.findIndex(req.decoded.gyms, { gym: req.params.id });

    if(test !== -1) {
      next();
    }else{
      return res.status(403).send({ 
        success: false, 
        message: 'User not part of gym.' 
      });
    }

  };
}

module.exports = hasGym;
