'use strict';

var express = require('express');
var _ = require('lodash');
var router = express.Router();

// Utils
var cloudinary = require('../../utils/cloudinary');

// Models
var Roles = require('../../models/roles');

//Controllers
var Users = require('../../controllers/users');
var Conversations = require('../../controllers/conversations');
var Sessions = require('../../controllers/sessions');


router.route('/')
  .get(function(req, res) {
    Users
      .getById(req.decoded._id, 'populateAll') // when getting me we want to populate everything
      .then(function(user) {
        if (!user) {
          res.status(404).json({error: 'no user found'});
        }

        res.json(user);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  })
  .put(function(req, res) {
    Users
      .updateById(req.decoded._id, req.body)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  })
  .delete(function(req, res) {
    Users
      .deleteAccount(req.decoded)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });

  router.route('/conversations')
  .get(function(req, res) {
    Conversations
      .getConversationsForUser(req.decoded._id)
      .then(function(conversations) {
        if (!conversations) {
          res.status(404).json({error: 'no conversations found'});
        }
        res.json(conversations);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });

  router.route('/session')
  .post(function(req, res) {
    var session;
    if (req.body.session) {
      try {
        session = JSON.parse(req.body.session);
        console.log(session)
        session.instructor = req.decoded._id;
      } catch(err) {
        console.log(err)
        res.status(422).json({error: 'invalid format'});
        return;
      }
      Sessions
        .add(session)
        .then(function(response) {
          res.json(response);
        })
        .catch(function(err) {
          console.log(err)
          res.status(422).json(err);
        });
    }
  });

module.exports = router;
