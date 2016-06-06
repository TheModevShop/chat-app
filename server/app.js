'use strict';

// Modules ==================================================
var express = require('express');
var feathers = require('feathers');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var compress = require('compression');
var helmet = require('helmet');
var path = require('path');
var cors = require('cors');
var service = require('feathers-mongoose');
var rest = require('feathers-rest');
var socketio = require('feathers-socketio');
var authentication = require('feathers-authentication');
var hooks = require('feathers-hooks');


// Start Express ============================================
var app = feathers();

// Route Modules ============================================
var services = require('./app/services/v1');

// MongoDB ==================================================
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/app';
mongoose.connect(mongoUri);

// Token Variable
app.set('superSecret', process.env.TOKEN_VARIABLE); // secret variable // Make env later

// App Middleware ===========================================
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(compress());
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// FEATHERS
app.configure(hooks());
app.configure(rest());
app.configure(socketio());
app.configure(authentication({
  expiresIn: "1d",
  payload: ['_id']
}));


// Routes ==================================================
app.configure(services)

// Catch 404 ===============================================
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  mongoose.set('debug', true);
  console.log("DEBUG DEV");

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
