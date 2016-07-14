'use strict';

// Modules ==================================================
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var compress = require('compression');
var helmet = require('helmet');
var path = require('path');

// Start Express ============================================
var app = express();

// Route Modules ============================================
var v1 = require('./app/routes/v1/index');

// MongoDB ==================================================
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/app';
mongoose.connect(mongoUri);

// Token Variable
app.set('superSecret', process.env.TOKEN_VARIABLE); // secret variable // Make env later

// App Middleware ===========================================
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(compress());
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });


// Routes ==================================================
app.use('/v1', v1);

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
