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
var Listings = require('../../controllers/listings');
var Transactions = require('../../controllers/transactions');


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


  router.route('/sessions')
  .get(function(req, res) {
    var query = req.query || {};
    query.id = req.decoded._id;
    console.log(query)
    if (false) { //req.query && req.query.role !== 'user'
      Users
        .getBookedInstructorSessions(query)
        .then(function(sessions) {
          res.json(sessions);
        });

    } else {
      console.log(query, 'sdafsakfsadf')
      query.notComplete = true;
      Users
        .getSessions(query)
        .then(function(sessions) {
          res.json(sessions);
        });
    }

  })
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
  })
  
router.route('/sessions/enroll')
  .put(function(req, res) {   
    var sessions = req.body.sessions || [];
    sessions = JSON.parse(sessions);
    Transactions.getTransactions(req.decoded._id, 1, 0, null, null, null, true)
    .then(function(failedTransactions) {
      if (failedTransactions.length) {
        res.status(422).json({error: 'outstanding failed payments, please update payment method and resolve'});
      } else {
        return Users.getPaymentMethod(req.decoded._id);
      }
    })
    .then(function(user) {
      if (true) { //user.paymentMethod TODO
        if (sessions.length && sessions.length === 1) {
          return Users.addSession(user, sessions[0], res);
        } else {
          return Users.mergeSessions(user, sessions, res);
        }
      } else {
        res.status(422).json({"error": "No payment method"});
      }
    })
    .then(function(session) {
      res.json(session);
    })
    .catch(function(err) {
      res.status(422).json(err);
    });
  });


  router.route('/listings')
  .get(function(req, res) {
    var queryObject = {
      me: req.decoded._id
    }
    Listings.getListings(queryObject)
    .then(function(response) {
      res.json(response);
    });
  })
  .post(function(req, res) {
    var listing;
    if (req.body.listing) {
      try {
        listing = JSON.parse(req.body.listing);
        listing.instructor = req.decoded._id;
      } catch(err) {
        console.log(err)
        res.status(422).json({error: 'invalid format'});
        return;
      }
      Listings
        .add(listing)
        .then(function(response) {
          res.json(response);
        })
        .catch(function(err) {
          console.log(err)
          res.status(422).json(err);
        });
    }
  });


  router.route('/listings/:id/sessions/batch')
  .post(function(req, res) {
    var times;
    try {
      times = JSON.parse(req.body.sessions).times 
    } catch(err) {
      res.status(422).json(err);
    }
    Listings.addSessionsForListing(req.params.id, times)
    .then(function(response) {
      res.json(response);
    });
  });

module.exports = router;
