'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Utils
var auth = require('../../utils/auth');

// Models
var Conversations = require('../../controllers/conversations');


router.route('/')
  .post(function(req, res) {
    Conversations.add(req.body, function(conversationAdded) {
      if (conversationAdded.error) {
        res.status(422)
      }
      res.json(conversationAdded);
    });
  })
  .get(function(req, res) {
    if (_.get(req.query, 'users')) {
      Conversations.getByUsersInConversation(req.query.users)
        .then(function(conversation) {
          res.json(conversation);
        })
        .catch(function(err) {
          res.status(422).json(err);
        })
    } else {
      Conversations.getAll(req.query.limit, req.query.offset)
        .then(function(conversations) {
          res.json(conversations);
        })
        .catch(function(err) {
          res.status(422).json(err);
        })
    }
  });

router.route('/:id')
  .get(function(req, res) {
    Conversations.getById(req.params.id)
      .then(function(conversation) {
        res.json(conversation);
      })
      .catch(function(err) {
        console.log(err)
      })
  })
  .put(function(req, res) {
    Conversations.updateById(req.params.id, req.body)
      .then(function(conversation) {
        res.json(conversation);
      })
      .catch(function(err) {
        console.log(err)
        res.status(422).json(err);
      });
  });

module.exports = router;
