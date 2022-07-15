"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.use('/', (req, res, next) => next());
router.get('/', ctrl.showHomePage);
router.post('/', ctrl.isSignedIn);
router.get('/signout', ctrl.onSignOut);

module.exports = router;