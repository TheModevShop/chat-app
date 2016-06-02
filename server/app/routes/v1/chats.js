'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Utils
var auth = require('../../utils/auth');

// Models
var Chats = require('../../controllers/chats');


router.route('/')
  .post(function(req, res) {
    Chats.add(req.body)
    .then(function(chatAdded) {
      res.json(chatAdded);
    })
    .catch(function(err) {
       res.status(422)
    })
      
  })
  .get(function(req, res) {
    if (_.get(req.query, 'conversationId')) {
      Chats.getChatsInConversation(req.query.conversationId)
        .then(function(chats) {
          res.json(chats);
        })
        .catch(function(err) {
          res.status(422).json(err);
        })
    } else {
      Chats.getAll(req.query.limit, req.query.offset)
      .then(function(users) {
        res.json(users);
      })
      .catch(function(err) {
        res.status(422).json(err);
      })
    }
  });

router.route('/:id')
  .get(function(req, res) {
    Chats.find({users: { $in: [req.params.id, req.params.id2]}})
      .then(function(user) {
        res.json(user);
      })
  })
  .put(function(req, res) {
    Chats.updateById(req.params.id, req.body)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(err) {
        res.status(422).json(err);
      });
  });


module.exports = router;
