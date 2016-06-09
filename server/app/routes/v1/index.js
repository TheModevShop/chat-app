'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');

// Utils
var auth = require('../../utils/auth');
var hasRole = require('../../utils/roleMiddleware');

// Routes
var authenticate = require('./authenticate');
var users = require('./users');
var me = require('./me');
var roles = require('./roles');
var forgot = require('./forgot');
var chats = require('./chats');
var conversations = require('./conversations');
var sessions = require('./sessions');
var search = require('./search');

router.use(cors());

router.use('/authenticate', authenticate);
router.use('/me', auth, me);
router.use('/roles', roles);
router.use('/forgot', forgot);
router.use('/users', users); 
router.use('/conversations', conversations); 
router.use('/chats', chats); 
router.use('/sessions', sessions);
router.use('/search', search);


module.exports = router;