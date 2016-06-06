'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Promise = require('bluebird');
// var auth = require('feathers-authentication').hooks;

// Models
var Conversations = require('../../../controllers/conversations');

module.exports = function(){
  var app = this;

  var meService = {
    get: function(id, params) {
     // return Users.getById(req.decoded._id, 'populateAll')
     //  .then(function(user) {
     //    return user
     //  })
    },

    update: function(id, data, params) {
      // return Users
      // .updateById(req.decoded._id, req.body)
      // .then(function(user) {
      //   return user
      // })
      // .catch(function(err) {
      //   return err
      // });
    },

    delete: function(data, params) {
      // return Users
      // .deleteAccount(req.decoded)
      // .then(function(user) {
      //   res.json(user);
      // })
      // .catch(function(err) {
      //   res.status(422).json(err);
      // });
    }
  }

  // Initialize our service with any options it requires
  app.use('/me', meService);
  // Get our initialize service to that we can bind hooks

};



// 'use strict';

// var express = require('express');
// var _ = require('lodash');
// var router = express.Router();


// //Controllers
// var Users = require('../../../controllers/users');


// router.route('/')
//   .get(function(req, res) {
//     Users
//       .getById(req.decoded._id, 'populateAll') // when getting me we want to populate everything
//       .then(function(user) {
//         if (!user) {
//           res.status(404).json({error: 'no user found'});
//         }

//         res.json(user);
//       })
//       .catch(function(err) {
//         res.status(422).json(err);
//       });
//   })
//   .put(function(req, res) {
//     Users
//       .updateById(req.decoded._id, req.body)
//       .then(function(user) {
//         res.json(user);
//       })
//       .catch(function(err) {
//         res.status(422).json(err);
//       });
//   })
//   .delete(function(req, res) {
//     Users
//       .deleteAccount(req.decoded)
//       .then(function(user) {
//         res.json(user);
//       })
//       .catch(function(err) {
//         res.status(422).json(err);
//       });
//   });

// module.exports = router;
